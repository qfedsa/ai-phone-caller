/**
 * TypeScript type definitions for the application
 */

// VAPI SDK types
export interface VapiInstance {
  start: (assistantId: string) => Promise<void>;
  stop: () => void;
  on: (event: VapiEvent, callback: (data?: any) => void) => void;
  off: (event: VapiEvent, callback: (data?: any) => void) => void;
}

export type VapiEvent =
  | 'call-start'
  | 'call-end'
  | 'speech-start'
  | 'speech-end'
  | 'volume-level'
  | 'error'
  | 'message';

export interface VapiError {
  message: string;
  code?: string;
  details?: any;
}

// Supabase Database types
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: LeadInsert;
        Update: LeadUpdate;
      };
    };
  };
}

export interface Lead {
  id: string;
  slug: string;
  company_name: string;
  first_name: string;
  email: string;
  vapi_agent_id: string;
  created_at: string;
}

export interface LeadInsert {
  id?: string;
  slug: string;
  company_name: string;
  first_name: string;
  email: string;
  vapi_agent_id: string;
  created_at?: string;
}

export interface LeadUpdate {
  slug?: string;
  company_name?: string;
  first_name?: string;
  email?: string;
  vapi_agent_id?: string;
}

// Component Props types
export interface VapiWidgetProps {
  agentId: string;
  companyName: string;
}

export type CallStatus = 'idle' | 'loading' | 'connecting' | 'active' | 'ended' | 'error';

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
}

export interface LeadResponse extends ApiResponse<Lead> {}

// Page Props types
export interface PageParams {
  slug: string;
}

export interface PageProps {
  params: PageParams;
}

// Environment variables type checking
export interface EnvironmentVariables {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}
