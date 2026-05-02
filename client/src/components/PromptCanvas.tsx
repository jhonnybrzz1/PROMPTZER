import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PromptCanvas as PromptCanvasType } from "@shared/artifact-types";
import { Target, Layers, FileText, Beaker } from "lucide-react";

interface PromptCanvasProps {
  values: PromptCanvasType;
  onChange: (values: PromptCanvasType) => void;
}

export default function PromptCanvas({ values, onChange }: PromptCanvasProps) {
  const handleChange = (field: keyof PromptCanvasType, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full p-1 overflow-auto">
      <div className="glass-card group p-5 transition-all hover:bg-[#16161A]/80 hover:border-white/20">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-[#7C3AED]" />
          <Label htmlFor="objetivo" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-[#7C3AED] transition-colors">
            1. Objetivo (Core Intent) *
          </Label>
        </div>
        <Textarea
          id="objetivo"
          placeholder="What is the primary goal of this prompt?"
          value={values.objetivo}
          onChange={(e) => handleChange("objetivo", e.target.value)}
          className="min-h-[120px] bg-transparent border-0 focus-visible:ring-0 p-0 text-sm leading-relaxed placeholder:text-white/20 resize-none"
        />
      </div>

      <div className="glass-card group p-5 transition-all hover:bg-[#16161A]/80 hover:border-white/20">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-[#8B5CF6]" />
          <Label htmlFor="contexto" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-[#8B5CF6] transition-colors">
            2. Contexto & Restrições
          </Label>
        </div>
        <Textarea
          id="contexto"
          placeholder="Define boundaries, tone, and technical constraints..."
          value={values.contexto}
          onChange={(e) => handleChange("contexto", e.target.value)}
          className="min-h-[120px] bg-transparent border-0 focus-visible:ring-0 p-0 text-sm leading-relaxed placeholder:text-white/20 resize-none"
        />
      </div>

      <div className="glass-card group p-5 transition-all hover:bg-[#16161A]/80 hover:border-white/20">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-[#0891B2]" />
          <Label htmlFor="formato" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-[#0891B2] transition-colors">
            3. Formato de Saída *
          </Label>
        </div>
        <Textarea
          id="formato"
          placeholder="How should the AI respond? (JSON, MD, Code...)"
          value={values.formato}
          onChange={(e) => handleChange("formato", e.target.value)}
          className="min-h-[120px] bg-transparent border-0 focus-visible:ring-0 p-0 text-sm leading-relaxed placeholder:text-white/20 resize-none"
        />
      </div>

      <div className="glass-card group p-5 transition-all hover:bg-[#16161A]/80 hover:border-white/20">
        <div className="flex items-center gap-2 mb-3">
          <Beaker className="w-4 h-4 text-emerald-500" />
          <Label htmlFor="exemplo" className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-emerald-500 transition-colors">
            4. Exemplos (Few-Shot)
          </Label>
        </div>
        <Textarea
          id="exemplo"
          placeholder="Provide high-quality examples for better accuracy..."
          value={values.exemplo}
          onChange={(e) => handleChange("exemplo", e.target.value)}
          className="min-h-[120px] bg-transparent border-0 focus-visible:ring-0 p-0 text-sm leading-relaxed placeholder:text-white/20 resize-none"
        />
      </div>
    </div>
  );
}
