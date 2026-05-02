import { Moon, Sun, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "./ThemeProvider";

interface TopBarProps {
  apiStatus: "connected" | "disconnected";
}

export default function TopBar({ apiStatus }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0C0C0E]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#0891B2] shadow-lg shadow-primary/20">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-white leading-tight">
              PROMPTZER
              <span className="ml-0.5 text-[#0891B2]">.AI</span>
            </h1>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
              High-Level Engineering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`h-4 w-4 ${apiStatus === 'connected' ? 'text-emerald-500' : 'text-rose-500'}`} />
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Engine: {apiStatus === 'connected' ? 'CodeStral 22B' : 'Offline'}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <Badge 
              variant="outline" 
              className={`border-2 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                apiStatus === 'connected' 
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' 
                  : 'border-rose-500/20 bg-rose-500/10 text-rose-500'
              }`}
            >
              {apiStatus === 'connected' ? 'Gateway Active' : 'Gateway Error'}
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-white/10 text-muted-foreground hover:text-white"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
