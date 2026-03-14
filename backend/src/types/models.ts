export interface SessionType {
  id?: number;
  title: string;
  content: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface VersionType {
  id: number;
  session_id: string;
  title: string;
  content: string | null;
  created_at: Date;

  changed_by?: string | null;
  version: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Point {
  x: number;
  y: number;
}
