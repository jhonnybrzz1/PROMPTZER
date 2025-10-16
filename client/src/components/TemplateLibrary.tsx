import { useState } from "react";
import { Search, Code, Zap, Bug, FileText, BarChart, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TemplateCard from "./TemplateCard";

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  icon: any;
  rating?: number;
}

const templates: Template[] = [
  {
    id: "1",
    title: "Gerar Função Python",
    description: "Criar uma função Python com documentação e testes",
    category: "Geração de Código",
    icon: Code,
    rating: 4.5,
    prompt: "Crie uma função Python que [descreva a funcionalidade]. Inclua:\n- Docstring detalhada\n- Type hints\n- Tratamento de erros\n- Testes unitários",
  },
  {
    id: "2",
    title: "Otimizar Algoritmo",
    description: "Melhorar performance e complexidade de algoritmo",
    category: "Otimização",
    icon: Zap,
    rating: 4.0,
    prompt: "Analise e otimize o seguinte algoritmo:\n\n[Cole seu código aqui]\n\nSugestões de otimização:\n- Reduzir complexidade temporal\n- Melhorar uso de memória\n- Aplicar melhores práticas",
  },
  {
    id: "3",
    title: "Debug de Erro",
    description: "Identificar e corrigir bugs no código",
    category: "Debug",
    icon: Bug,
    rating: 3.5,
    prompt: "Encontre e corrija o erro no seguinte código:\n\n[Cole o código com erro]\n\nDescrição do problema: [descreva o comportamento esperado vs real]",
  },
  {
    id: "4",
    title: "Documentar API",
    description: "Criar documentação completa para API",
    category: "Documentação",
    icon: FileText,
    rating: 4.2,
    prompt: "Gere documentação completa para esta API:\n\n[Cole endpoints e schemas]\n\nIncluir:\n- Descrição de cada endpoint\n- Parâmetros e tipos\n- Exemplos de request/response\n- Códigos de erro",
  },
  {
    id: "5",
    title: "Análise de Complexidade",
    description: "Analisar Big O e sugerir melhorias",
    category: "Análise",
    icon: BarChart,
    rating: 3.8,
    prompt: "Analise a complexidade do seguinte código:\n\n[Cole seu código]\n\nForneça:\n- Análise Big O (tempo e espaço)\n- Identificação de gargalos\n- Sugestões de otimização",
  },
  {
    id: "6",
    title: "Converter Código",
    description: "Transformar código entre linguagens",
    category: "Geração de Código",
    icon: Code,
    rating: 4.1,
    prompt: "Converta o seguinte código de [linguagem origem] para [linguagem destino]:\n\n[Cole o código original]\n\nManter a mesma funcionalidade e estrutura",
  },
  {
    id: "7",
    title: "Refatorar Código",
    description: "Melhorar estrutura e legibilidade",
    category: "Otimização",
    icon: Zap,
    rating: 4.3,
    prompt: "Refatore o seguinte código para melhorar legibilidade e manutenção:\n\n[Cole o código original]\n\nAplique:\n- Nomes de variáveis mais claros\n- Funções menores e mais focadas\n- Remoção de código duplicado",
  },
  {
    id: "8",
    title: "Adicionar Testes",
    description: "Gerar testes automatizados",
    category: "Documentação",
    icon: FileText,
    rating: 3.9,
    prompt: "Crie testes unitários para o seguinte código:\n\n[Cole o código a ser testado]\n\nIncluir:\n- Testes para casos normais\n- Testes para casos de erro\n- Testes de borda",
  },
];

const categories = ["Todas", "Geração de Código", "Otimização", "Debug", "Documentação", "Análise"];

interface TemplateLibraryProps {
  selectedTemplate: string | null;
  onSelectTemplate: (template: Template) => void;
}

export default function TemplateLibrary({
  selectedTemplate,
  onSelectTemplate,
}: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === "Todas" || template.category === selectedCategory) &&
      (
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="w-[320px] border-r bg-card flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-3">Templates</h2>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-template-search"
          />
        </div>

        <div className="flex items-center gap-2">
          <ListFilter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 grid grid-cols-1 gap-3">
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
