// useChat hook automation tests — successful message send via MSW.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { useChat } from "../useChat";

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe("useChat", () => {
  it("returns assistant message payload on successful mutation", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { mutations: { retry: false } },
    });
    const { result } = renderHook(() => useChat(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate({ copilot_id: "cop-001", message: "Hello" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({
      role: "assistant",
      content: "Hello! How can I help you today?",
    });
  });
});
