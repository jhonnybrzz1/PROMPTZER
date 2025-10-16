
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wand, RefreshCw, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function RequestTransformer() {
  const [inputText, setInputText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleTransform = () => {
    // Simple transformation logic - can be enhanced with AI
    const transformed = `Como desenvolvedor experiente, ${inputText.trim()}.

Por favor, forneça uma solução completa com:
1. Código implementado
2. Documentação adequada
3. Exemplos de uso
4. Tratamento de erros
5. Testes unitários

Formate a resposta usando markdown com blocos de código apropriados.`;

    setTransformedText(transformed);
  };

  const handleClear = () => {
    setInputText("");
    setTransformedText("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wand className="w-4 h-4" />
          Transformar Solicitação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Transformador de Solicitações</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Descreva o que você precisa que o robô desenvolvedor faça..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex gap-2">
            <Button onClick={handleTransform} disabled={!inputText.trim()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Transformar
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Limpar
            </Button>
          </div>
          {transformedText && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Prompt Transformado:</h3>
              <div className="relative">
                <Textarea
                  value={transformedText}
                  readOnly
                  className="min-h-[150px] bg-gray-100 dark:bg-gray-800"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(transformedText);
                    toast({
                      title: "Copiado!",
                      description: "O prompt transformado foi copiado para a área de transferência.",
                    });
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
