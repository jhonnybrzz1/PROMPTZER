import { useState } from "react";
import TopBar from "@/components/TopBar";
import TemplateLibrary, { Template } from "@/components/TemplateLibrary";
import PromptEditor from "@/components/PromptEditor";
import ValidationAlert, { ValidationType } from "@/components/ValidationAlert";
import HistoryPanel, { HistoryEntry } from "@/components/HistoryPanel";
import ResponseDisplay from "@/components/ResponseDisplay";
import { Button } from "@/components/ui/button";
import { Send, Eraser } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validations, setValidations] = useState<
    Array<{ id: string; type: ValidationType; message: string }>
  >([]);

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
    console.log("Prompt cleared");
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

    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      prompt,
      timestamp: new Date(),
    };
    setHistory([newEntry, ...history]);

    setIsLoading(true);
    setResponse("");
    
    setTimeout(() => {
      setResponse(`// Resposta simulada do CodeStral\n\nSeu prompt foi: "${prompt.substring(0, 50)}..."\n\nEsta é uma resposta de exemplo. Quando a API estiver configurada, você verá a resposta real do CodeStral aqui.`);
      setIsLoading(false);
      setValidations([
        {
          id: "success",
          type: "success",
          message: "Prompt enviado com sucesso!",
        },
      ]);
    }, 1500);

    console.log("Sending prompt to CodeStral:", prompt);
  };

  const handleReuse = (entry: HistoryEntry) => {
    setPrompt(entry.prompt);
    validatePrompt(entry.prompt);
    console.log("Reusing prompt:", entry);
  };

  const handleEdit = (entry: HistoryEntry) => {
    setPrompt(entry.prompt);
    validatePrompt(entry.prompt);
    console.log("Editing prompt:", entry);
  };

  const handleDelete = (id: string) => {
    setHistory(history.filter((entry) => entry.id !== id));
    console.log("Deleted prompt:", id);
  };

  const dismissValidation = (id: string) => {
    setValidations(validations.filter((v) => v.id !== id));
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar apiStatus="disconnected" />

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

              {response && (
                <div className="h-64">
                  <ResponseDisplay response={response} isLoading={isLoading} />
                </div>
              )}
            </div>
          </div>

          <div className="border-t p-4 bg-card">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleClear}
                data-testid="button-clear"
              >
                <Eraser className="w-4 h-4 mr-2" />
                Limpar
              </Button>
              <Button
                className="flex-1"
                onClick={handleSend}
                disabled={prompt.length < 20}
                data-testid="button-send"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar para CodeStral
              </Button>
            </div>
          </div>
        </div>

        <HistoryPanel
          history={history}
          onReuse={handleReuse}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
