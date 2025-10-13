import TemplateCard from "../TemplateCard";
import { Code } from "lucide-react";

export default function TemplateCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <TemplateCard
        id="example"
        title="Gerar Função Python"
        description="Criar uma função Python com documentação e testes"
        icon={Code}
        category="Geração de Código"
        onClick={() => console.log("Template selected")}
      />
    </div>
  );
}
