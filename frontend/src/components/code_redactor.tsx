import { useRef, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, ViewUpdate } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import styles from "../styles/editor.module.css";
import type { CodeRedacorProps } from "../types/interfaces";
import { socket } from "../socket/connection";

export function CodeRedacrtor({ content, setSessionInfo }: CodeRedacorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(content);

    const state = EditorState.create({
      doc: content ? content : "",
      extensions: [
        keymap.of(defaultKeymap),
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            const value: string = update.state.doc.toString();
            console.log(value);
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

    return () => {
      view.destroy();
    };
  }, [content]);
  return <div ref={editorRef} className={styles["editor-container"]} />;
}
