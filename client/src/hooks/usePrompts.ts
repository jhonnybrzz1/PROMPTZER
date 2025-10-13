import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Prompt, InsertPrompt } from "@shared/schema";

export function usePrompts() {
  return useQuery<Prompt[]>({
    queryKey: ["/api/prompts"],
  });
}

export function useCreatePrompt() {
  return useMutation({
    mutationFn: async (data: InsertPrompt) => {
      const res = await apiRequest("POST", "/api/prompts", data);
      return res.json() as Promise<Prompt>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prompts"] });
    },
  });
}

export function useDeletePrompt() {
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/prompts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prompts"] });
    },
  });
}
