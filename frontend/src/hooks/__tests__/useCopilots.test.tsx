// useCopilots hook tests — loading, success, errors, and cache invalidation.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { mockCopilots } from "../../test/fixtures";
import { server } from "../../test/mocks/server";
import { useCopilots } from "../useCopilots";

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe("useCopilots", () => {
  it("returns loading state initially", () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const { result } = renderHook(() => useCopilots(), {
      wrapper: createWrapper(queryClient),
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("returns copilots list on success", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const { result } = renderHook(() => useCopilots(), {
      wrapper: createWrapper(queryClient),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockCopilots);
  });

  it("returns error state when API fails", async () => {
    server.use(
      http.get("/api/copilots", () =>
        HttpResponse.json({ detail: "Server error" }, { status: 500 }),
      ),
    );
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const { result } = renderHook(() => useCopilots(), {
      wrapper: createWrapper(queryClient),
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeTruthy();
  });

  it("refetches when query is invalidated", async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const { result } = renderHook(() => useCopilots(), {
      wrapper: createWrapper(queryClient),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await queryClient.invalidateQueries({ queryKey: ["copilots"] });
    await waitFor(() => expect(result.current.isFetching).toBe(false));
    expect(result.current.data).toEqual(mockCopilots);
  });
});
