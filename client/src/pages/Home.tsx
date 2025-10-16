import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import TemplateLibrary, { Template } from "@/components/TemplateLibrary";
import PromptEditor from "@/components/PromptEditor";
import ValidationAlert, { ValidationType } from "@/components/ValidationAlert";
import HistoryPanel from "@/components/HistoryPanel";
import ResponseDisplay from "@/components/ResponseDisplay";
import { Button } from "@/components/ui/button";
import { Send, Eraser } from "lucide-react";
import { usePrompts, useCreatePrompt, useDeletePrompt } from "@/hooks/usePrompts";
import { useCodeStral } from "@/hooks/useCodeStral";
import { useToast } from "@/hooks/use-toast";
import type { Prompt } from "@shared/schema";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [validations, setValidations] = useState<
    Array<{ id: string; type: ValidationType; message: string }>
  >([]);
  const [apiStatus, setApiStatus] = useState<"connected" | "disconnected">("disconnected");

  const { data: prompts = [], isLoading: isLoadingPrompts } = usePrompts();
  const createPrompt = useCreatePrompt();
  const deletePrompt = useDeletePrompt();
  const ratePrompt = useRatePrompt();
  const codeStral = useCodeStral();
  const { toast } = useToast();

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const res = await fetch("/api/status");
        const data = await res.json();
        setApiStatus(data.connected ? "connected" : "disconnected");
      } catch (error) {
        setApiStatus("disconnected");
      }
    };

    checkApiStatus();
  }, []);

  const validatePrompt = (text: string) => {
    const newValidations: Array<{
      id: string;
      type: ValidationType;
      message: string;
    }> = [];

    if (text.length < 20 && text.length > 0) {
      newValidations.push({
        id: "short",
        type: "warning",
        message: "Prompt muito curto. Adicione mais contexto para melhores resultados.",
      });
    }

    if (text.length > 0 && !text.includes("?") && text.split(" ").length < 5) {
      newValidations.push({
        id: "context",
        type: "warning",
        message: "Adicione mais detalhes sobre o que você precisa.",
      });
    }

    const hasCodeBlock = text.includes("```") || text.includes("[Cole");
    if (hasCodeBlock && text.length < 50) {
      newValidations.push({
        id: "incomplete",
        type: "warning",
        message: "Parece que você começou a adicionar código. Complete o prompt.",
      });
    }

    setValidations(newValidations);
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    validatePrompt(value);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    setPrompt(template.prompt);
    validatePrompt(template.prompt);
  };

  const handleClear = () => {
    setPrompt("");
    setSelectedTemplate(null);
    setValidations([]);
    setResponse("");
  };

  const handleSend = async () => {
    if (prompt.length < 20) {
      setValidations([
        {
          id: "error",
          type: "error",
          message: "Prompt muito curto. Mínimo de 20 caracteres necessário.",
        },
      ]);
      return;
    }

    try {
      await createPrompt.mutateAsync({
        content: prompt,
        templateId: selectedTemplate,
      });

      const result = await codeStral.mutateAsync(prompt);
      setResponse(result.response);
      
      setValidations([
        {
          id: "success",
          type: "success",
          message: "Prompt enviado com sucesso!",
        },
      ]);

      toast({
        title: "Sucesso",
        description: "Resposta recebida do CodeStral",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao enviar prompt";
      
      setValidations([
        {
          id: "error",
          type: "error",
          message: errorMessage.includes("Chave da API")
            ? "Configure a chave da API do CodeStral nas variáveis de ambiente"
            : errorMessage,
        },
      ]);

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const dismissValidation = (id: string) => {
    setValidations(validations.filter((v) => v.id !== id));
  };

  const historyEntries = prompts.map((p) => ({
    id: p.id,
    prompt: p.content,
    timestamp: new Date(p.createdAt),
    rating: p.rating,
  }));

  const handleReuse = (entry: { id: string; prompt: string; timestamp: Date }) => {
    const originalPrompt = prompts.find(p => p.id === entry.id);
    if (originalPrompt) {
      setPrompt(originalPrompt.content);
      setSelectedTemplate(originalPrompt.templateId);
      validatePrompt(originalPrompt.content);
    }
  };

  const handleEdit = (entry: { id: string; prompt: string; timestamp: Date }) => {
    const originalPrompt = prompts.find(p => p.id === entry.id);
    if (originalPrompt) {
      setPrompt(originalPrompt.content);
      setSelectedTemplate(originalPrompt.templateId);
      validatePrompt(originalPrompt.content);
    }
  };

  const handleDelete = (id: string) => {
    deletePrompt.mutate(id);
    toast({
      title: "Prompt deletado",
      description: "O prompt foi removido do histórico",
    });
  };

  const handleRate = (id: string, rating: number) => {
    ratePrompt.mutate({ id, rating });
    toast({
      title: "Prompt avaliado",
      description: `Você deu ${rating} estrelas para este prompt`,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar apiStatus={apiStatus} />

      <div className="flex-1 flex overflow-hidden">
        <TemplateLibrary
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleTemplateSelect}
        />

        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-4 h-full flex flex-col">
              {validations.length > 0 && (
                <div className="space-y-2">
                  {validations.map((validation) => (
                    <ValidationAlert
                      key={validation.id}
                      type={validation.type}
                      message={validation.message}
                      onDismiss={() => dismissValidation(validation.id)}
                    />
                  ))}
                </div>
              )}

              <div className="flex-1 min-h-0">
                <PromptEditor value={prompt} onChange={handlePromptChange} />
              </div>

              {(response || codeStral.isPending) && (
                <div className="h-64">
                  <ResponseDisplay
                    response={response}
                    isLoading={codeStral.isPending}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-t p-4 bg-card">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={codeStral.isPending}
                data-testid="button-clear"
              >
                <Eraser className="w-4 h-4 mr-2" />
                Limpar
              </Button>
              <Button
                className="flex-1"
                onClick={handleSend}
                disabled={prompt.length < 20 || codeStral.isPending}
                data-testid="button-send"
              >
                <Send className="w-4 h-4 mr-2" />
                {codeStral.isPending ? "Enviando..." : "Enviar para CodeStral"}
              </Button>
            </div>
          </div>
        </div>

        <HistoryPanel
          history={historyEntries}
          onReuse={handleReuse}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRate={handleRate}
        />
      </div>
    </div>
  );
}
