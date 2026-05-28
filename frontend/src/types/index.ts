// Shared frontend TypeScript interfaces for Copilot Studio domain models.
export interface Organization {
  id: string;
  name: string;
  plan: string;
  created_at: string;
}

export interface User {
  id: string;
  org_id: string;
  email: string;
  role: "admin" | "member";
  created_at: string;
}

export interface CopilotTools {
  web_search: boolean;
  db_query: boolean;
  memory: boolean;
}

export interface Copilot {
  id: string;
  org_id: string;
  name: string;
  description: string;
  persona: string;
  model_provider: string;
  model_name: string;
  temperature: number;
  status: "active" | "draft" | "archived";
  tools: CopilotTools;
  created_at: string;
  updated_at: string;
  conversation_count: number;
  last_edited: string;
}

export interface KnowledgeFile {
  id: string;
  copilot_id: string;
  filename: string;
  file_type: string;
  file_size: number;
  status: "ready" | "processing" | "failed";
  upload_date: string;
  storage_path: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  tokens: number;
  latency_ms: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  copilot_id: string;
  user_id: string;
  started_at: string;
  message_count: number;
}

export interface AuditLog {
  id: string;
  org_id: string;
  user_id: string;
  action: string;
  resource: string;
  ip_address: string;
  timestamp: string;
}
