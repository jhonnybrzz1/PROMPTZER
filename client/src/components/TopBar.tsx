import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "./ThemeProvider";

interface TopBarProps {
  apiStatus: "connected" | "disconnected";
}

export default function TopBar({ apiStatus }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">Promptizer</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge
          variant={apiStatus === "connected" ? "default" : "secondary"}
          className="gap-1.5"
          data-testid="badge-api-status"
        >
          <div
            className={`w-2 h-2 rounded-full ${
              apiStatus === "connected" ? "bg-green-500" : "bg-muted-foreground"
            }`}
          />
          {apiStatus === "connected" ? "Conectado" : "Desconectado"}
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
