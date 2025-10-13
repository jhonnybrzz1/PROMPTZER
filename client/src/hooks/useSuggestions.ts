import { useQuery } from "@tanstack/react-query";

export function useSuggestions(query: string) {
  return useQuery<string[]>({
    queryKey: ["/api/suggestions", query],
    enabled: query.length > 0,
  });
}
