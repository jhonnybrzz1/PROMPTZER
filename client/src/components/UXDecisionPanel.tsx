import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { ValidationResult } from "@shared/artifact-types";

interface UXDecisionPanelProps {
  status: ValidationResult["status"];
  score: number;
  top3: string[];
}

export default function UXDecisionPanel({ status, score, top3 }: UXDecisionPanelProps) {
  const isReady = status === "success";

  return (
    <div className={`glass-card p-5 border-2 transition-all duration-500 ${
      isReady 
        ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.05)]" 
        : "border-amber-500/30 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.05)]"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isReady ? "bg-emerald-500/20" : "bg-amber-500/20"}`}>
            {isReady ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
              isReady ? "text-emerald-500/60" : "text-amber-500/60"
            }`}>
              Gate Audit Status
            </span>
            <span className={`text-sm font-black uppercase tracking-wider ${
              isReady ? "text-emerald-100" : "text-amber-100"
            }`}>
              {isReady ? "Artifact Ready for Production" : "Manual Review Required"}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold uppercase text-muted-foreground mb-1 tracking-widest">
            Engineering Score
          </span>
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-3 h-3 ${isReady ? "text-emerald-400" : "text-amber-400"}`} />
            <span className={`text-2xl font-black tracking-tighter ${
              isReady ? "text-emerald-400" : "text-amber-400"
            }`}>
              {score}<span className="text-xs opacity-50 ml-0.5">/100</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {top3.map((sug, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full transition-all hover:bg-white/10 group cursor-default">
            <Sparkles className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">{sug}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
