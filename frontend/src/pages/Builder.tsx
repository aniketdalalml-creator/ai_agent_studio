// Builder page for configuring copilot behavior and tools.
import { useSearchParams } from "react-router-dom";

import { useCopilots } from "../hooks/useCopilots";

export default function Builder(): JSX.Element {
  const [searchParams] = useSearchParams();
  const copilotId = searchParams.get("copilotId");
  const { data: copilots = [] } = useCopilots();
  const copilot = copilots.find((item) => item.id === copilotId);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">{copilot?.name ?? "Copilot Builder"}</h1>
      <p className="mt-2 text-slate-600">Configure persona, model, and tools.</p>
    </main>
  );
}
