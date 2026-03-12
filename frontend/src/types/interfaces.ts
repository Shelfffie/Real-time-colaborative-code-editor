import type { EditorView } from "@codemirror/view";

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
  editorViewRef: React.RefObject<EditorView | null>;
}

export interface NewCode {
  userId: string;
  value: string;
}
