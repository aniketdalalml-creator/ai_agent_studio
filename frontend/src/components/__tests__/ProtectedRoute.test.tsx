// ProtectedRoute tests — redirects unauthenticated users to login.
import { describe, expect, it, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";
import { useAuthStore } from "../../store/authStore";
import { render, screen } from "@testing-library/react";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, isLoading: false });
  });

  it("redirects to login when no token is present", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secret dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Login page")).toBeInTheDocument();
    expect(screen.queryByText("Secret dashboard")).not.toBeInTheDocument();
  });

  it("renders children when token exists", () => {
    useAuthStore.setState({ token: "valid-token" });
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Secret dashboard</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText("Secret dashboard")).toBeInTheDocument();
  });
});
