import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResponseDisplayProps {
  response: string;
  isLoading?: boolean;
}

export default function ResponseDisplay({
  response,
  isLoading = false,
}: ResponseDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <Card className="h-full p-6">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        </div>
      </Card>
    );
  }

  if (!response) {
    return (
      <Card className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            A resposta do CodeStral aparecerá aqui
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium text-muted-foreground">
            Resposta CodeStral
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleCopy}
          data-testid="button-copy-response"
        >
          {copied ? (
            <Check className="h-4 w-4 text-chart-3" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <pre className="font-mono text-sm whitespace-pre-wrap" data-testid="text-response">
            {response}
          </pre>
        </div>
      </ScrollArea>
    </Card>
  );
}
