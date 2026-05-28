// Dashboard page for listing and managing copilots.
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CopilotCard from "../components/CopilotCard";
import { useCopilots } from "../hooks/useCopilots";

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();
  const { data: copilots = [], isLoading } = useCopilots();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCopilotName, setNewCopilotName] = useState("");

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button
          type="button"
          className="rounded bg-primary px-4 py-2 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          New Copilot
        </button>
      </div>

      {isLoading ? <p>Loading copilots...</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.isArray(copilots) ? (
          copilots.map((copilot) => (
            <CopilotCard
              key={copilot.id}
              copilot={copilot}
              onOpen={(copilotId) => navigate(`/builder?copilotId=${copilotId}`)}
            />
          ))
        ) : (
          <div className="col-span-full">
            <p className="text-sm text-muted-foreground">Unexpected data returned from server.</p>
            <pre className="mt-2 max-h-48 overflow-auto text-xs">{JSON.stringify(copilots, null, 2)}</pre>
          </div>
        )}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <form
            className="w-full max-w-md rounded-lg bg-white p-6"
            onSubmit={(event) => {
              event.preventDefault();
              setIsModalOpen(false);
            }}
          >
            <h2 className="mb-4 text-lg font-semibold">Create Copilot</h2>
            <label className="block" htmlFor="copilot-name">
              <span className="text-sm">Copilot name</span>
              <input
                id="copilot-name"
                className="mt-1 w-full rounded border px-3 py-2"
                value={newCopilotName}
                onChange={(event) => setNewCopilotName(event.target.value)}
              />
            </label>
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="rounded bg-primary px-3 py-1.5 text-white">
                Create
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
