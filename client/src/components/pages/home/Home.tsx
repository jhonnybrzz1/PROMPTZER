import { useState, useCallback } from "react";
import { useApiStatus } from "@/components/layout/Layout";
import TemplateLibrary, { Template } from "@/components/TemplateLibrary";
import PromptCanvas from "@/components/PromptCanvas";
import PromptCoach from "@/components/PromptCoach";
import ValidationAlert, { ValidationType } from "@/components/ValidationAlert";
import HistoryPanel from "@/components/HistoryPanel";
import ResponseDisplay from "@/components/ResponseDisplay";
import UXDecisionPanel from "@/components/UXDecisionPanel";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Send, Eraser, LayoutGrid, Clock, ChevronRight } from "lucide-react";
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
  const [isTemplateSheetOpen, setIsTemplateSheetOpen] = useState(false);
  const [isHistorySheetOpen, setIsHistorySheetOpen] = useState(false);

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
      contexto: "Template: " + template.title,
      formato: "Standard engineering format",
      exemplo: ""
    });
    setPromptState("draft");
    setIsTemplateSheetOpen(false);
    toast({
      title: "Template Applied",
      description: `Loaded "${template.title}" into canvas.`,
    });
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
      const field = isMissingObjective ? "Core Intent" : "Output Format";
      const diagnostic = `CONTRACT VIOLATED: ${field} insufficient.`;
      const nextStep = `Action: Write at least 10 characters in the "${field}" block to unlock build execution.`;
      const promise = "This ensures the AI has enough signal to render a high-level artifact.";
      
      setValidations([{
        id: "gate_error",
        type: "error",
        message: `${diagnostic} ${nextStep} ${promise}`
      }]);
      trackEvent("prompt_sent_validation", { status: "fail", reason: field });
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
          message: "Prompt validated and executed successfully!",
        },
      ]);

      toast({
        title: "Execution Ready",
        description: "Prompt Engineer: Artifact rendered.",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Error processing artifact";
      setPromptState("draft");
      
      setValidations([
        {
          id: "error",
          type: "error",
          message: errorMessage,
        },
      ]);

      toast({
        title: "Engineering Error",
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
        contexto: "Audit Replay",
        formato: "Restored from history",
        exemplo: ""
      });
      setSelectedTemplate(originalPrompt.templateId);
      setPromptState("draft");
      setIsHistorySheetOpen(false);
      toast({
        title: "Audit Restored",
        description: "Content loaded back into canvas.",
      });
    }
  };

  const handleEdit = (entry: { id: string; prompt: string; timestamp: Date }) => {
    handleReuse(entry);
  };

  const handleDelete = (id: string) => {
    deletePrompt.mutate(id);
    toast({
      title: "History Updated",
      description: "Artifact removed from audit trail.",
    });
  };

  const handleRate = (id: string, rating: number) => {
    ratePrompt.mutate({ id, rating });
  };

  return (
    <main className="flex-1 max-w-[1440px] mx-auto w-full p-6 lg:p-10 overflow-hidden flex flex-col gap-8">
      
      {/* Header Section: Single Trail Focus */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#0891B2]">Canvas</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium max-w-lg">
            Focus on deconstructing your intent into core engineering blocks.
          </p>
        </div>
      </section>

      {/* Main Bento Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Left: Input Canvas (8/12) - The SFOT Core */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
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

          <div className="min-h-[400px]">
            <PromptCanvas values={canvas} onChange={handleCanvasChange} />
          </div>

          {/* Response Section: The Loop Result */}
          {(response || codeStral.isPending) && (
            <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
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

        {/* Right: Focused Sidebar (4/12) */}
        <aside className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
          
          <PromptCoach 
            state={promptState} 
            canvas={canvas} 
            onFix={(label) => {
              const id = label.toLowerCase().split(' ')[0];
              const element = document.getElementById(id);
              if (element) element.focus();
            }}
          />

          <div className="glass-card p-6 space-y-6 border-white/10 bg-white/5 shadow-2xl">
             <div className="space-y-1">
               <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Execution Hub</h3>
               <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider">Primary Action Trail</p>
             </div>
             
             <div className="space-y-4">
               <Button
                 className="w-full btn-primary-gradient py-8 text-base tracking-widest uppercase font-black"
                 onClick={handleSend}
                 disabled={codeStral.isPending}
               >
                 <Send className="w-5 h-5 mr-3" />
                 {codeStral.isPending ? "Auditing..." : "Execute Build"}
               </Button>
               
               <div className="grid grid-cols-1 gap-3">
                  {/* Secondary Actions moved to Sheets to unclutter */}
                  <div className="flex gap-2">
                    <Sheet open={isTemplateSheetOpen} onOpenChange={setIsTemplateSheetOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 flex-col items-center justify-center rounded-xl border-white/5 bg-white/5 hover:bg-white/10 h-16 group"
                        >
                          <div className="flex items-center text-[10px] font-black uppercase tracking-widest mb-1">
                             <LayoutGrid className="w-3.5 h-3.5 mr-2 text-[#7C3AED]" /> Templates
                          </div>
                          <span className="text-[8px] text-muted-foreground/60 font-bold uppercase group-hover:text-[#7C3AED]/80 transition-colors">Apply (Replaces Canvas)</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-md bg-[#0C0C0E] border-white/5 p-0">
                        <SheetHeader className="p-6 border-b border-white/5">
                          <SheetTitle className="text-white uppercase font-black tracking-widest">Template Library</SheetTitle>
                        </SheetHeader>
                        <TemplateLibrary
                          selectedTemplate={selectedTemplate}
                          onSelectTemplate={handleTemplateSelect}
                        />
                      </SheetContent>
                    </Sheet>

                    <Sheet open={isHistorySheetOpen} onOpenChange={setIsHistorySheetOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 flex-col items-center justify-center rounded-xl border-white/5 bg-white/5 hover:bg-white/10 h-16 group"
                        >
                          <div className="flex items-center text-[10px] font-black uppercase tracking-widest mb-1">
                            <Clock className="w-3.5 h-3.5 mr-2 text-[#0891B2]" /> History
                          </div>
                          <span className="text-[8px] text-muted-foreground/60 font-bold uppercase group-hover:text-[#0891B2]/80 transition-colors">Restore (Replaces Canvas)</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-md bg-[#0C0C0E] border-white/5 p-0">
                        <SheetHeader className="p-6 border-b border-white/5">
                          <SheetTitle className="text-white uppercase font-black tracking-widest text-sm flex items-center justify-between">
                            Audit Trail
                            <span className="text-[10px] bg-white/10 px-2 py-1 rounded">{prompts.length}</span>
                          </SheetTitle>
                        </SheetHeader>
                        <HistoryPanel
                          history={historyEntries}
                          onReuse={handleReuse}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onRate={handleRate}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-white"
                    onClick={handleClear}
                    disabled={codeStral.isPending}
                  >
                    <Eraser className="w-3 h-3 mr-2" /> Reset Engineering Canvas
                  </Button>
               </div>
             </div>
          </div>

          <div className="flex-1 flex flex-col justify-end pb-4">
             <div className="p-4 rounded-xl border border-white/5 bg-white/2 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-emerald-500" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-emerald-500/80 transition-colors">Documentation</span>
                </div>
             </div>
          </div>

        </aside>
      </div>
    </main>
  );
}
