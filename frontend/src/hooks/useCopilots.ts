// React Query hook placeholder for copilot API interactions.
import { useQuery } from "@tanstack/react-query";

import api from "../lib/api";
import type { Copilot } from "../types";

async function fetchCopilots(): Promise<Copilot[]> {
  try {
    const response = await api.get<unknown>("/api/copilots");
    const payload = response.data as unknown;

    // Normalize common response shapes to an array of copilots
    if (Array.isArray(payload)) {
      return payload as Copilot[];
    }

    if (payload && typeof payload === "object") {
      const p = payload as Record<string, unknown>;
      if (Array.isArray(p.data)) return p.data as Copilot[];
      if (Array.isArray(p.copilots)) return p.copilots as Copilot[];
    }

    // If backend returned something unexpected, throw to trigger fallback below
    throw new Error("Unexpected copilots response shape");
  } catch (err) {
    // If there's no backend or response is unexpected during local development,
    // return sample data so the dashboard isn't empty and development can continue.
    // Re-throw in production so failures are visible.
    // eslint-disable-next-line no-console
    console.warn("Failed to fetch copilots or unexpected shape, returning dev fallback:", err);
    if (import.meta.env.DEV) {
      const now = new Date().toISOString();
      return [
        {
          id: "copilot-1",
          org_id: "org-1",
          name: "Example Copilot",
          description: "A sample copilot for local development.",
          persona: "Helpful assistant",
          model_provider: "openai",
          model_name: "gpt-4o-mini",
          temperature: 0.2,
          status: "active",
          tools: { web_search: false, db_query: false, memory: false },
          created_at: now,
          updated_at: now,
          conversation_count: 0,
          last_edited: now,
        },
      ];
    }
    throw err;
  }
}

export function useCopilots() {
  return useQuery({
    queryKey: ["copilots"],
    queryFn: fetchCopilots,
  });
}
