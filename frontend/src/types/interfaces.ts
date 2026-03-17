import type { EditorView } from "@codemirror/view";

export interface Point {
  x: number;
  y: number;
  colour: string;
}

export interface SessionType {
  id?: string;
  title: string;
  content: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface VersionType {
  id: string;
  session_id: string;
  title: string;
  content: string | null;
  created_at: Date;
  changed_by?: string | null;
  version: string;
  description: string;
}

export interface CodeRedacorProps {
  content: string | null | undefined;
  editorViewRef: React.RefObject<EditorView | null>;
  version: VersionType | null;
}

export interface NewCode {
  userId: string;
  value: string;
}

export interface RoomStatus {
  inRoom: boolean | null;
  isPassword: boolean;
}
