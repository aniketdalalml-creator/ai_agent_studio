// React Query hook placeholder for posting chat messages.
import { useMutation } from "@tanstack/react-query";

import api from "../lib/api";
import type { Message } from "../types";

interface ChatPayload {
  copilot_id: string;
  message: string;
}

async function sendMessage(payload: ChatPayload): Promise<Message> {
  const response = await api.post<Message>("/api/chat", payload);
  return response.data;
}

export function useChat() {
  return useMutation({
    mutationFn: sendMessage,
  });
}
