import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { PromptState, PromptCanvas } from "@shared/artifact-types";

interface PromptCoachProps {
  state: PromptState | "blocked";
  canvas: PromptCanvas;
  onFix?: (label: string) => void;
}

export default function PromptCoach({ state, canvas, onFix }: PromptCoachProps) {
  const isMissingObjective = canvas.objetivo.length < 10;
  const isMissingFormat = canvas.formato.length < 10;
  
  const getCoachAdvice = () => {
    if (state === "blocked") {
      return {
        title: "Contrato Violado",
        message: "O Engenheiro de Prompt bloqueou o envio. Corrija os pontos obrigatórios abaixo.",
        variant: "destructive" as const,
        icon: <AlertTriangle className="w-5 h-5" />,
        items: [
          isMissingObjective && "Objetivo está muito vago ou vazio.",
          isMissingFormat && "Formato de saída não foi especificado.",
        ].filter(Boolean) as string[]
      };
    }

    if (state === "draft") {
      return {
        title: "Dicas de Engenharia",
        message: "Melhore seu canvas para garantir um prompt de alto nível.",
        variant: "default" as const,
        icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
        items: [
          !canvas.contexto && "Adicione contexto para evitar respostas genéricas.",
          !canvas.exemplo && "Exemplos (few-shot) aumentam a precisão em 40%.",
        ].filter(Boolean) as string[]
      };
    }

    if (state === "generated") {
      return {
        title: "Pronto para Uso",
        message: "O artefato foi validado pelo Gate e está pronto.",
        variant: "success" as const,
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        items: ["Você pode copiar ou salvar agora."]
      };
    }

    return null;
  };

  const advice = getCoachAdvice();
  if (!advice) return null;

  return (
    <Card className={`border-2 ${advice.variant === 'destructive' ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-start gap-3">
          {advice.icon}
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight">{advice.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{advice.message}</p>
          </div>
        </div>

        {advice.items.length > 0 && (
          <div className="space-y-2">
            {advice.items.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between bg-white/50 p-2 rounded border border-slate-100 cursor-pointer hover:bg-white"
                onClick={() => onFix?.(item)}
              >
                <span className="text-[11px] font-medium">{item}</span>
                <Badge variant="outline" className="text-[9px] uppercase">Corrigir</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
