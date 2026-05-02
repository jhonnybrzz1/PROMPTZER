import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0C0C0E] flex items-center justify-center p-6">
          <div className="glass-card p-10 max-w-md w-full border-rose-500/20 bg-rose-500/5 text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-rose-500/10 mb-2">
              <AlertCircle className="w-10 h-10 text-rose-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-white uppercase">Algo deu errado</h2>
              <p className="text-sm text-muted-foreground font-medium">
                {this.state.error?.message || "Ocorreu um erro inesperado no sistema de engenharia."}
              </p>
            </div>
            <Button 
              onClick={() => window.location.reload()}
              className="w-full btn-primary-gradient py-6"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Recarregar Aplicação
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
