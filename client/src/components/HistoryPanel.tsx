import { ScrollArea } from "@/components/ui/scroll-area";
import HistoryItem from "./HistoryItem";

export interface HistoryEntry {
  id: string;
  prompt: string;
  timestamp: Date;
  rating?: number;
}

interface HistoryPanelProps {
  history: HistoryEntry[];
  onReuse: (entry: HistoryEntry) => void;
  onEdit: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
}

export default function HistoryPanel({
  history,
  onReuse,
  onEdit,
  onDelete,
  onRate,
}: HistoryPanelProps) {
  return (
    <div className="w-[320px] border-l bg-card flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Histórico</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {history.length} {history.length === 1 ? "prompt" : "prompts"} salvos
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {history.length > 0 ? (
            history.map((entry) => (
              <HistoryItem
                key={entry.id}
                {...entry}
                onReuse={() => onReuse(entry)}
                onEdit={() => onEdit(entry)}
                onDelete={() => onDelete(entry.id)}
                onRate={onRate ? (rating) => onRate(entry.id, rating) : undefined}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">
                Nenhum prompt no histórico
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Seus prompts salvos aparecerão aqui
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
