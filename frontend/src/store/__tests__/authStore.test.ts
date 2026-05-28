// Auth store tests — token persistence and logout behavior.
import { beforeEach, describe, expect, it } from "vitest";

import { mockUser } from "../../test/fixtures";
import { useAuthStore } from "../authStore";

describe("authStore", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAuthStore.setState({ user: null, token: null, isLoading: false });
  });

  it("sets user and token in state", () => {
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setToken("test-token");
    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().token).toBe("test-token");
  });

  it("loads token from localStorage on initialize", async () => {
    window.localStorage.setItem("copilot_studio_token", "stored-token");
    await useAuthStore.getState().initialize();
    expect(useAuthStore.getState().token).toBe("stored-token");
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("clears user and token on logout", () => {
    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setToken("test-token");
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
  });
});
