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
    <div className="flex flex-col h-full bg-transparent">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
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
            <div className="text-center py-20 px-6">
              <div className="inline-flex p-3 rounded-full bg-white/5 mb-4">
                <Clock className="w-6 h-6 text-muted-foreground/40" />
              </div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Audit Trail Empty
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">
                Your engineered artifacts will appear here after execution.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
