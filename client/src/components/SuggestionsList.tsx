import { Card } from "@/components/ui/card";

interface SuggestionsListProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function SuggestionsList({
  suggestions,
  onSelect,
}: SuggestionsListProps) {
  if (suggestions.length === 0) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-48 overflow-auto">
      <div className="p-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full text-left px-3 py-2 text-sm rounded hover-elevate active-elevate-2"
            onClick={() => onSelect(suggestion)}
            data-testid={`suggestion-${index}`}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </Card>
  );
}
