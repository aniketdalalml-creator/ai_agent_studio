// Copilot summary card for dashboard listing.
import type { Copilot } from "../types";
import { cn } from "../lib/utils";

interface CopilotCardProps {
  copilot: Copilot;
  onOpen: (copilotId: string) => void;
}

const statusStyles: Record<Copilot["status"], string> = {
  active: "bg-teal/10 text-teal border-teal/30",
  draft: "bg-amber-100 text-amber-800 border-amber-300",
  archived: "bg-slate-100 text-slate-600 border-slate-300",
};

export default function CopilotCard({ copilot, onOpen }: CopilotCardProps): JSX.Element {
  return (
    <article data-testid="copilot-card" className="rounded-lg border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{copilot.name}</h3>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-xs font-semibold",
            statusStyles[copilot.status],
          )}
        >
          {copilot.status.toUpperCase()}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{copilot.description}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
        <span>{copilot.conversation_count} conversations</span>
        <span>{copilot.model_name}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          className="rounded bg-primary px-3 py-1.5 text-sm text-white"
          onClick={() => onOpen(copilot.id)}
        >
          Open Builder
        </button>
        <button type="button" aria-label="more options" className="px-2 text-lg">
          ...
        </button>
      </div>
    </article>
  );
}
