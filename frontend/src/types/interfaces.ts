import type { EditorView } from "@codemirror/view";
import type { Socket } from "socket.io-client";

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
  socket: Socket | null;
}

export interface NewCode {
  userId: string;
  value: string;
}
