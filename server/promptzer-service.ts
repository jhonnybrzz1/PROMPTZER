import { 
  PromptzerHighLevelResponse, 
  ValidationResult, 
  ReasonCode 
} from "@shared/artifact-types";

export class PromptzerService {
  /**
   * Valida a resposta bruta da IA contra o contrato de Alto Nível (Gate).
   */
  async generateHighLevelArtifact(
    inputPrompt: string, 
    rawAiResponse: string,
    metadata?: any
  ): Promise<PromptzerHighLevelResponse> {
    const validation = this.validateArtifact(rawAiResponse);

    return {
      artifact_rendered: rawAiResponse,
      validation,
      raw_ai_metadata: metadata ? {
        model: metadata.model,
        usage: metadata.usage
      } : undefined
    };
  }

  private validateArtifact(content: string): ValidationResult {
    const top3: string[] = [];
    let score = 100;
    let reasonCode: ReasonCode | undefined;

    // 1. Check for empty response
    if (!content || content.trim().length === 0) {
      return {
        status: "fail",
        score: 0,
        reasonCode: "empty_response",
        top3: ["IA retornou resposta vazia", "Verifique a conexão", "Tente um prompt mais detalhado"]
      };
    }

    // 2. Structural checks (Naive but effective for MVP)
    const hasObjectiveSection = /OBJETIVO|OBJECTIVE/i.test(content);
    const hasFormatSection = /FORMATO|FORMAT/i.test(content);
    
    if (!hasObjectiveSection) {
      score -= 40;
      top3.push("Faltou seção de Objetivo");
    }
    
    if (!hasFormatSection) {
      score -= 40;
      top3.push("Faltou seção de Formato");
    }

    // 3. Length checks
    if (content.length < 100) {
      score -= 20;
      top3.push("Prompt final muito curto");
      reasonCode = "insufficient_detail";
    }

    // Decision Gate
    const status = score >= 60 ? "success" : "fail";
    
    if (status === "fail" && !reasonCode) {
      reasonCode = "structure_incomplete";
    }

    // If success, provide suggestions to reach 100 if not there
    if (status === "success" && score < 100) {
      if (top3.length === 0) top3.push("Adicione exemplos práticos");
    }

    if (status === "success" && score === 100) {
      top3.push("Estrutura completa", "Contrato validado", "Pronto para produção");
    }

    return {
      status,
      score: Math.max(0, score),
      reasonCode,
      top3: top3.slice(0, 3)
    };
  }
}

export const promptzerService = new PromptzerService();
