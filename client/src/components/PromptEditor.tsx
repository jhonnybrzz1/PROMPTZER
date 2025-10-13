import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import SuggestionsList from "./SuggestionsList";
import { useSuggestions } from "@/hooks/useSuggestions";

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PromptEditor({
  value,
  onChange,
  placeholder = "Descreva sua solicitação aqui...",
}: PromptEditorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { data: suggestions = [] } = useSuggestions(searchQuery);

  const charCount = value.length;
  const minChars = 20;
  const maxChars = 4000;

  useEffect(() => {
    const words = value.split(" ");
    const lastWord = words[words.length - 1];
    
    if (lastWord && lastWord.length >= 2 && !value.endsWith(" ")) {
      setSearchQuery(lastWord);
    } else {
      setSearchQuery("");
    }
  }, [value]);

  const showSuggestions = searchQuery.length >= 2 && suggestions.length > 0;

  const handleSuggestionSelect = (suggestion: string) => {
    const words = value.split(" ");
    words[words.length - 1] = suggestion;
    onChange(words.join(" ") + " ");
    setSearchQuery("");
    textareaRef.current?.focus();
  };

  return (
    <div className="relative h-full flex flex-col">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 resize-none font-mono text-base border-2 focus-visible:border-primary min-h-[200px]"
        data-testid="textarea-prompt"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions.slice(0, 5)}
          onSelect={handleSuggestionSelect}
        />
      )}
      
      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-card px-2 py-1 rounded">
        {charCount} / {maxChars} caracteres
        {charCount < minChars && charCount > 0 && (
          <span className="text-chart-4 ml-2">
            (mínimo {minChars - charCount} caracteres)
          </span>
        )}
      </div>
    </div>
  );
}
