import { useRef, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  ViewUpdate,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
} from "@codemirror/language";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import styles from "../styles/editor.module.css";
import type { CodeRedacorProps } from "../types/interfaces";
import { useSocket } from "../socket/socketContext";

export function CodeRedacrtor({
  content,
  editorViewRef,
  version,
}: CodeRedacorProps) {
  const socket = useSocket();
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return;
    console.log("content:", content);

    const state = EditorState.create({
      doc: content ?? "",
      extensions: [
        lineNumbers(),
        foldGutter(),
        highlightSpecialChars(),
        history(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
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
    const next = version?.content ?? content ?? "";

    if (current === next) return;

    editorViewRef.current?.dispatch({
      changes: {
        from: 0,
        to: editorViewRef.current.state.doc.length,
        insert: next,
      },
    });
  }, [content, version]);

  return <div ref={editorRef} className={styles["editor-container"]} />;
}
