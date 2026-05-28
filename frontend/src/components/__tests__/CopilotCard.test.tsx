// CopilotCard component tests — rendering, status badges, actions, and snapshot.
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CopilotCard from "../CopilotCard";
import { mockCopilots } from "../../test/fixtures";
import { render, screen } from "../../test/utils";

describe("CopilotCard", () => {
  const copilot = mockCopilots[0];

  it("renders copilot name correctly", () => {
    render(<CopilotCard copilot={copilot} onOpen={vi.fn()} />);
    expect(screen.getByRole("heading", { name: copilot.name })).toBeInTheDocument();
  });

  it("renders correct status badge for active status", () => {
    render(<CopilotCard copilot={copilot} onOpen={vi.fn()} />);
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
  });

  it("renders correct status badge for draft status", () => {
    render(<CopilotCard copilot={mockCopilots[1]} onOpen={vi.fn()} />);
    expect(screen.getByText("DRAFT")).toBeInTheDocument();
  });

  it("shows conversation count", () => {
    render(<CopilotCard copilot={copilot} onOpen={vi.fn()} />);
    expect(screen.getByText(`${copilot.conversation_count} conversations`)).toBeInTheDocument();
  });

  it("shows model name not model id", () => {
    render(<CopilotCard copilot={copilot} onOpen={vi.fn()} />);
    expect(screen.getByText(copilot.model_name)).toBeInTheDocument();
    expect(screen.queryByText(copilot.model_provider)).not.toBeInTheDocument();
  });

  it("calls onOpen callback when Open Builder is clicked", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(<CopilotCard copilot={copilot} onOpen={onOpen} />);
    await user.click(screen.getByRole("button", { name: "Open Builder" }));
    expect(onOpen).toHaveBeenCalledWith(copilot.id);
  });

  it("shows more options button", () => {
    render(<CopilotCard copilot={copilot} onOpen={vi.fn()} />);
    expect(screen.getByRole("button", { name: "more options" })).toBeInTheDocument();
  });

  it("matches snapshot for visual regression", () => {
    const { container } = render(<CopilotCard copilot={copilot} onOpen={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
