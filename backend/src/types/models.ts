export interface SessionType {
  id?: number;
  session_id?: string;
  title: string;
  content: string | null;
  created_at?: Date;
  updated_ar?: Date;
  changed_by?: string | null;
  version?: string;
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
