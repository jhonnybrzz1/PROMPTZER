import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isSelected?: boolean;
  onClick: () => void;
}

export default function TemplateCard({
  id,
  title,
  description,
  icon: Icon,
  isSelected = false,
  onClick,
}: TemplateCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover-elevate active-elevate-2 ${
        isSelected ? "border-l-4 border-l-primary" : ""
      }`}
      onClick={onClick}
      data-testid={`card-template-${id}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
