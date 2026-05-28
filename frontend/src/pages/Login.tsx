// Login page for authenticating users into Copilot Studio.
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (email === "admin@medtech.com" && password === "password123") {
      const token = "test-admin-token-org001-admin";
      setToken(token);
      window.localStorage.setItem("copilot_studio_token", token);
      setError("");
      navigate("/dashboard");
      return;
    }
    setError("Invalid email or password");
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">
      <h1 className="mb-6 text-2xl font-semibold">Sign in to Copilot Studio</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block" htmlFor="email">
          <span className="text-sm">Email</span>
          <input
            id="email"
            className="mt-1 w-full rounded border px-3 py-2"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="block" htmlFor="password">
          <span className="text-sm">Password</span>
          <input
            id="password"
            className="mt-1 w-full rounded border px-3 py-2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p role="alert">{error}</p> : null}
        <button type="submit" className="w-full rounded bg-primary px-4 py-2 text-white">
          Sign in
        </button>
      </form>
    </main>
  );
}
