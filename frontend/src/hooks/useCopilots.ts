// React Query hook placeholder for copilot API interactions.
import { useQuery } from "@tanstack/react-query";

import api from "../lib/api";
import type { Copilot } from "../types";

async function fetchCopilots(): Promise<Copilot[]> {
  const response = await api.get<Copilot[]>("/api/copilots");
  return response.data;
}

export function useCopilots() {
  return useQuery({
    queryKey: ["copilots"],
    queryFn: fetchCopilots,
  });
}
