import { useRef, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, ViewUpdate } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import styles from "../styles/editor.module.css";
import type { CodeRedacorProps } from "../types/interfaces";

export function CodeRedacrtor({
  content,
  editorViewRef,
  socket,
}: CodeRedacorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return;
    console.log("content:", content);

    const state = EditorState.create({
      doc: content ?? "",
      extensions: [
        keymap.of(defaultKeymap),
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const value: string = update.state.doc.toString();
            socket.emit("editor-change", value);
          }
        }),
      ],
    });

    if (!editorRef.current) return;
    const view = new EditorView({
      state: state,
      parent: editorRef.current,
    });

    if (editorViewRef) editorViewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [socket]);

  useEffect(() => {
    if (!editorViewRef.current) return;

    const current = editorViewRef.current.state.doc.toString();
    const next = content ?? "";

    if (current === next) return;

    editorViewRef.current?.dispatch({
      changes: {
        from: 0,
        to: editorViewRef.current.state.doc.length,
        insert: content ?? "",
      },
    });
  }, [content]);

  return <div ref={editorRef} className={styles["editor-container"]} />;
}
