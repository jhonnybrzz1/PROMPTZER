import { useState } from "react";
import { Search, Code, Zap, Bug, FileText, BarChart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import TemplateCard from "./TemplateCard";

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  icon: any;
}

const templates: Template[] = [
  {
    id: "1",
    title: "Gerar Função Python",
    description: "Criar uma função Python com documentação e testes",
    category: "Geração de Código",
    icon: Code,
    prompt: "Crie uma função Python que [descreva a funcionalidade]. Inclua:\n- Docstring detalhada\n- Type hints\n- Tratamento de erros\n- Testes unitários",
  },
  {
    id: "2",
    title: "Otimizar Algoritmo",
    description: "Melhorar performance e complexidade de algoritmo",
    category: "Otimização",
    icon: Zap,
    prompt: "Analise e otimize o seguinte algoritmo:\n\n[Cole seu código aqui]\n\nSugestões de otimização:\n- Reduzir complexidade temporal\n- Melhorar uso de memória\n- Aplicar melhores práticas",
  },
  {
    id: "3",
    title: "Debug de Erro",
    description: "Identificar e corrigir bugs no código",
    category: "Debug",
    icon: Bug,
    prompt: "Encontre e corrija o erro no seguinte código:\n\n[Cole o código com erro]\n\nDescrição do problema: [descreva o comportamento esperado vs real]",
  },
  {
    id: "4",
    title: "Documentar API",
    description: "Criar documentação completa para API",
    category: "Documentação",
    icon: FileText,
    prompt: "Gere documentação completa para esta API:\n\n[Cole endpoints e schemas]\n\nIncluir:\n- Descrição de cada endpoint\n- Parâmetros e tipos\n- Exemplos de request/response\n- Códigos de erro",
  },
  {
    id: "5",
    title: "Análise de Complexidade",
    description: "Analisar Big O e sugerir melhorias",
    category: "Análise",
    icon: BarChart,
    prompt: "Analise a complexidade do seguinte código:\n\n[Cole seu código]\n\nForneça:\n- Análise Big O (tempo e espaço)\n- Identificação de gargalos\n- Sugestões de otimização",
  },
];

interface TemplateLibraryProps {
  selectedTemplate: string | null;
  onSelectTemplate: (template: Template) => void;
}

export default function TemplateLibrary({
  selectedTemplate,
  onSelectTemplate,
}: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[280px] border-r bg-card flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-3">Templates</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-template-search"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                {...template}
                isSelected={selectedTemplate === template.id}
                onClick={() => onSelectTemplate(template)}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhum template encontrado
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
