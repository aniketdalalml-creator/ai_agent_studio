// Login page automation tests — success, failure, and navigation.
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, beforeEach } from "vitest";

import Login from "../Login";
import { useAuthStore } from "../../store/authStore";
import { render, screen } from "@testing-library/react";

describe("Login page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAuthStore.setState({ user: null, token: null, isLoading: false });
  });

  it("shows error message for invalid credentials", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText("Email"), "wrong@medtech.com");
    await user.type(screen.getByLabelText("Password"), "bad-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email or password");
  });

  it("stores token in auth store on successful login", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText("Email"), "admin@medtech.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(useAuthStore.getState().token).toBe("test-admin-token-org001-admin");
  });
});
