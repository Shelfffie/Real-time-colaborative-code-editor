export interface Point {
  x: number;
  y: number;
}

export interface SessionType {
  id?: number;
  title: string;
  content: string | null;
  created_at?: Date;
  updated_ar?: Date;
}

export interface CodeRedacorProps {
  content: string | null | undefined;
  setSessionInfo: React.Dispatch<React.SetStateAction<SessionType | undefined>>;
}
