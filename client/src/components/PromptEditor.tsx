import { Textarea } from "@/components/ui/textarea";

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
  const charCount = value.length;
  const minChars = 20;
  const maxChars = 4000;

  return (
    <div className="relative h-full flex flex-col">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 resize-none font-mono text-base border-2 focus-visible:border-primary min-h-[200px]"
        data-testid="textarea-prompt"
      />
      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-card px-2 py-1 rounded">
        {charCount} / {maxChars} caracteres
        {charCount < minChars && (
          <span className="text-chart-4 ml-2">
            (mínimo {minChars - charCount} caracteres)
          </span>
        )}
      </div>
    </div>
  );
}
