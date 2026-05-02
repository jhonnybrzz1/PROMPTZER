import { useState, useCallback } from "react";
import { useApiStatus } from "@/components/layout/Layout";
import TemplateLibrary, { Template } from "@/components/TemplateLibrary";
import PromptCanvas from "@/components/PromptCanvas";
import PromptCoach from "@/components/PromptCoach";
import ValidationAlert, { ValidationType } from "@/components/ValidationAlert";
import HistoryPanel from "@/components/HistoryPanel";
import ResponseDisplay from "@/components/ResponseDisplay";
import UXDecisionPanel from "@/components/UXDecisionPanel";
import RequestTransformer from "@/components/RequestTransformer";
import { Button } from "@/components/ui/button";
import { Send, Eraser } from "lucide-react";
import { usePrompts, useCreatePrompt, useDeletePrompt, useRatePrompt } from "@/hooks/usePrompts";
import { useCodeStral } from "@/hooks/useCodeStral";
import { useToast } from "@/hooks/use-toast";
import type { 
  PromptzerHighLevelResponse, 
  PromptCanvas as PromptCanvasType, 
  PromptState, 
  LocalMetricEvent 
} from "@shared/artifact-types";

export default function Home() {
  const { apiStatus } = useApiStatus();
  const [canvas, setCanvas] = useState<PromptCanvasType>({
    objetivo: "",
    contexto: "",
    formato: "",
    exemplo: ""
  });
  const [promptState, setPromptState] = useState<PromptState>("draft");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [highLevelResponse, setHighLevelResponse] = useState<PromptzerHighLevelResponse | null>(null);
  const [validations, setValidations] = useState<
    Array<{ id: string; type: ValidationType; message: string }>
  >([]);

  const { data: prompts = [], isLoading: isLoadingPrompts } = usePrompts();
  const createPrompt = useCreatePrompt();
  const deletePrompt = useDeletePrompt();
  const ratePrompt = useRatePrompt();
  const codeStral = useCodeStral();
  const { toast } = useToast();

  // Local Metrics Helper
  const trackEvent = useCallback((event: LocalMetricEvent["event"], details?: Record<string, any>) => {
    const events: LocalMetricEvent[] = JSON.parse(localStorage.getItem("promptzer_metrics") || "[]");
    const newEvent: LocalMetricEvent = {
      event,
      timestamp: new Date().toISOString(),
      details
    };
    events.push(newEvent);
    localStorage.setItem("promptzer_metrics", JSON.stringify(events));
    console.log(`[Metric] ${event}`, details);
  }, []);

  const handleCanvasChange = (newCanvas: PromptCanvasType) => {
    setCanvas(newCanvas);
    if (promptState === "generated") {
      setPromptState("edited_after_generation");
      trackEvent("prompt_edited_after_generation");
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.id);
    setCanvas({
      objetivo: template.prompt,
      contexto: "Template selecionado: " + template.id,
      formato: "Padrão do template",
      exemplo: ""
    });
    setPromptState("draft");
  };

  const handleClear = () => {
    setCanvas({ objetivo: "", contexto: "", formato: "", exemplo: "" });
    setPromptState("draft");
    setSelectedTemplate(null);
    setValidations([]);
    setResponse("");
    setHighLevelResponse(null);
  };

  const handleSend = async () => {
    const isMissingObjective = canvas.objetivo.trim().length < 10;
    const isMissingFormat = canvas.formato.trim().length < 10;

    if (isMissingObjective || isMissingFormat) {
      setPromptState("blocked");
      const reason = isMissingObjective ? "Objetivo insuficiente" : "Formato de saída insuficiente";
      setValidations([{
        id: "gate_error",
        type: "error",
        message: `CONTRATO VIOLADO: ${reason}. O prompt deve ter pelo menos 10 caracteres no Objetivo e no Formato.`
      }]);
      trackEvent("prompt_sent_validation", { status: "fail", reason });
      return;
    }

    const finalPrompt = `
# OBJETIVO
${canvas.objetivo}

# CONTEXTO E RESTRIÇÕES
${canvas.contexto}

# FORMATO DE SAÍDA
${canvas.formato}

${canvas.exemplo ? `# EXEMPLO\n${canvas.exemplo}` : ""}
`.trim();

    try {
      trackEvent("prompt_sent", { state: promptState });
      
      await createPrompt.mutateAsync({
        content: finalPrompt,
        templateId: selectedTemplate,
      });

      const result = await codeStral.mutateAsync(finalPrompt);
      setResponse(result.artifact_rendered);
      setHighLevelResponse(result);
      setPromptState("generated");
      trackEvent("prompt_generated", { score: result.validation.score });
      
      setValidations([
        {
          id: "success",
          type: "success",
          message: "Prompt validado e enviado com sucesso!",
        },
      ]);

      toast({
        title: "Sucesso",
        description: "Engenheiro de Prompt: Artefato pronto.",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao processar artefato";
      setPromptState("draft");
      
      setValidations([
        {
          id: "error",
          type: "error",
          message: errorMessage,
        },
      ]);

      toast({
        title: "Erro de Engenharia",
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
    rating: p.rating ?? undefined,
  }));

  const handleReuse = (entry: { id: string; prompt: string; timestamp: Date }) => {
    const originalPrompt = prompts.find(p => p.id === entry.id);
    if (originalPrompt) {
      setCanvas({
        objetivo: originalPrompt.content,
        contexto: "Reuso do histórico",
        formato: "Recuperado",
        exemplo: ""
      });
      setSelectedTemplate(originalPrompt.templateId);
      setPromptState("draft");
    }
  };

  const handleEdit = (entry: { id: string; prompt: string; timestamp: Date }) => {
    handleReuse(entry);
  };

  const handleDelete = (id: string) => {
    deletePrompt.mutate(id);
    toast({
      title: "Histórico atualizado",
      description: "Prompt removido da trilha de auditoria",
    });
  };

  const handleRate = (id: string, rating: number) => {
    ratePrompt.mutate({ id, rating });
  };

  return (
    <main className="flex-1 max-w-[1440px] mx-auto w-full p-6 lg:p-10 overflow-hidden flex flex-col gap-8">
      
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#0891B2]">Canvas</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium max-w-lg">
            Deconstruct your requirements into structured engineering blocks to generate production-ready AI prompts.
          </p>
        </div>
        <div className="flex gap-3">
           <TemplateLibrary
             selectedTemplate={selectedTemplate}
             onSelectTemplate={handleTemplateSelect}
           />
        </div>
      </section>

      {/* Main Bento Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Left: Input Canvas (8/12) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-h-0">
          {validations.length > 0 && (
            <div className="space-y-3">
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

          <div className="flex-1 min-h-0 relative">
            <PromptCanvas values={canvas} onChange={handleCanvasChange} />
          </div>

          {/* Response Section (If generated) */}
          {(response || codeStral.isPending) && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {highLevelResponse && (
                <UXDecisionPanel 
                  status={highLevelResponse.validation.status}
                  top3={highLevelResponse.validation.top3}
                  score={highLevelResponse.validation.score}
                />
              )}
              <div className="h-96 glass-card overflow-hidden">
                <ResponseDisplay
                  response={response}
                  isLoading={codeStral.isPending}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Sidebar Actions (4/12) */}
        <aside className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          
          <PromptCoach 
            state={promptState} 
            canvas={canvas} 
            onFix={(label) => {
              const id = label.toLowerCase().split(' ')[0];
              const element = document.getElementById(id);
              if (element) element.focus();
            }}
          />

          <div className="glass-card p-6 space-y-6 border-white/10 bg-white/5">
             <div className="space-y-1">
               <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Command Center</h3>
               <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider">Execute & Transform</p>
             </div>
             
             <div className="space-y-3">
               <Button
                 className="w-full btn-primary-gradient py-7 text-sm"
                 onClick={handleSend}
                 disabled={codeStral.isPending}
               >
                 <Send className="w-4 h-4 mr-2" />
                 {codeStral.isPending ? "Auditing Artifact..." : "Execute Generation"}
               </Button>
               
               <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest"
                    onClick={handleClear}
                    disabled={codeStral.isPending}
                  >
                    <Eraser className="w-3.5 h-3.5 mr-2" /> Clear
                  </Button>
                  <RequestTransformer />
               </div>
             </div>
          </div>

          <div className="flex-1 min-h-0">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Audit History</h3>
              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-muted-foreground/60 font-bold">{prompts.length}</span>
            </div>
            <HistoryPanel
              history={historyEntries}
              onReuse={handleReuse}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRate={handleRate}
            />
          </div>

        </aside>
      </div>
    </main>
  );
}
