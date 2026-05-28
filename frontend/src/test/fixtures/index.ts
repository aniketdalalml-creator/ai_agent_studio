// Reusable test data — matches our TypeScript types exactly.
import type { Copilot, KnowledgeFile, User } from "../../types";

export const mockUser: User = {
  id: "user-001",
  org_id: "org-001",
  email: "admin@medtech.com",
  role: "admin",
  created_at: "2024-01-01T00:00:00Z",
};

export const mockMemberUser: User = {
  id: "user-002",
  org_id: "org-001",
  email: "member@medtech.com",
  role: "member",
  created_at: "2024-01-01T00:00:00Z",
};

export const mockCopilots: Copilot[] = [
  {
    id: "cop-001",
    org_id: "org-001",
    name: "Support Bot",
    description: "Handles customer support queries",
    persona: "You are a helpful support assistant.",
    model_provider: "anthropic",
    model_name: "claude-sonnet-4-6",
    temperature: 0.7,
    status: "active",
    tools: {
      web_search: true,
      db_query: false,
      memory: true,
    },
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    conversation_count: 450,
    last_edited: "Oct 24, 2023",
  },
  {
    id: "cop-002",
    org_id: "org-001",
    name: "Sales Assistant",
    description: "Helps qualify leads",
    persona: "You are a professional sales assistant.",
    model_provider: "openai",
    model_name: "gpt-4o",
    temperature: 0.5,
    status: "draft",
    tools: {
      web_search: false,
      db_query: true,
      memory: false,
    },
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
    conversation_count: 12,
    last_edited: "Nov 01, 2023",
  },
];

export const mockFiles: KnowledgeFile[] = [
  {
    id: "file-001",
    copilot_id: "cop-001",
    filename: "faq.pdf",
    file_type: "pdf",
    file_size: 1258291,
    status: "ready",
    upload_date: "2024-01-10T00:00:00Z",
    storage_path: "org-001/cop-001/faq.pdf",
  },
  {
    id: "file-002",
    copilot_id: "cop-001",
    filename: "product_manual.docx",
    file_type: "docx",
    file_size: 860160,
    status: "processing",
    upload_date: "2024-01-15T00:00:00Z",
    storage_path: "org-001/cop-001/product_manual.docx",
  },
];
