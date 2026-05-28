// Zustand auth store for user session and token lifecycle state.
import { create } from "zustand";

import type { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null, isLoading: false }),
  initialize: async () => {
    set({ isLoading: true });
    try {
      const storedToken = window.localStorage.getItem("copilot_studio_token");
      if (storedToken) {
        set({ token: storedToken });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
