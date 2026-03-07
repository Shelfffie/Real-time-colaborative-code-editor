export interface SessionType {
  id?: number;
  title: string;
  content: string;
  created_at?: Date;
  updated_ar?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
