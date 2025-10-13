import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Pencil, Trash2 } from "lucide-react";

interface HistoryItemProps {
  id: string;
  prompt: string;
  timestamp: Date;
  onReuse: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HistoryItem({
  id,
  prompt,
  timestamp,
  onReuse,
  onEdit,
  onDelete,
}: HistoryItemProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "agora";
    if (diffMins < 60) return `${diffMins}min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays}d atrás`;
  };

  return (
    <Card className="p-3 hover-elevate" data-testid={`card-history-${id}`}>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs text-muted-foreground">{formatTime(timestamp)}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onReuse}
              data-testid={`button-reuse-${id}`}
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onEdit}
              data-testid={`button-edit-${id}`}
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onDelete}
              data-testid={`button-delete-${id}`}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <p className="text-sm font-mono line-clamp-3">{prompt}</p>
      </div>
    </Card>
  );
}
