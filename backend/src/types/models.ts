export interface SessionType {
  id?: number;
  title: string;
  content: string | null;
  created_at?: Date;
  updated_ar?: Date;
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
