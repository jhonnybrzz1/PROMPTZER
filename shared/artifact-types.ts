export interface PromptCanvas {
  objetivo: string;
  contexto: string;
  formato: string;
  exemplo?: string;
}

export type PromptState = 
  | "draft" 
  | "generated" 
  | "blocked" 
  | "edited_after_generation";

export type ReasonCode = 
  | "missing_objective" 
  | "missing_format" 
  | "structure_incomplete" 
  | "empty_response"
  | "insufficient_detail";

export interface ValidationResult {
  status: "success" | "fail";
  score: number; // 0 a 100
  reasonCode?: ReasonCode;
  top3: string[]; // Sugestões de melhoria
}

export interface PromptzerHighLevelResponse {
  artifact_rendered: string;
  validation: ValidationResult;
  raw_ai_metadata?: {
    model: string;
    usage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
  };
}

export interface LocalMetricEvent {
  event: "prompt_sent" | "prompt_generated" | "prompt_sent_validation" | "prompt_edited_after_generation";
  timestamp: string;
  details?: Record<string, any>;
}
