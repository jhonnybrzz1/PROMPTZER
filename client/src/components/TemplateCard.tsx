import { LucideIcon, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isSelected?: boolean;
  rating?: number;
  onClick: () => void;
}

export default function TemplateCard({
  id,
  title,
  description,
  icon: Icon,
  category,
  isSelected = false,
  rating = 0,
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
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-sm flex items-center gap-2">
              {title}
              {rating > 0 && (
                <span className="text-xs text-muted-foreground flex items-center gap-0.5 ml-2">
                  <Star className="w-3 h-3 fill-chart-3 text-chart-3" />
                  {rating.toFixed(1)}
                </span>
              )}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
