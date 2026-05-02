import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { PromptzerHighLevelResponse } from "@shared/artifact-types";

export function useCodeStral() {
  return useMutation({
    mutationFn: async (prompt: string) => {
      const res = await apiRequest("POST", "/api/codestral/generate", { prompt });
      return res.json() as Promise<PromptzerHighLevelResponse>;
    },
  });
}
