import { useSocket } from "../socket/socketContext";
import { useEffect, useRef } from "react";
import { СustomCursor } from "./custom_cursor";
import { useCursor } from "../hooks/use_curcor_point";
import { useOtherCursors } from "../hooks/other_cursors";
import { useParams, type Params } from "react-router-dom";
import { CodeRedacrtor } from "./code_redactor";
import { useCode } from "../hooks/use_code";
import type { EditorView } from "@codemirror/view";
import type { NewCode } from "../types/interfaces";

export default function Connection() {
  const socket = useSocket();
  const { mousePos, handleMouse, isVisible, handleMouseLeave } = useCursor();
  const editorViewRef = useRef<EditorView | null>(null);
  const cursors = useOtherCursors();
  const { id }: Readonly<Params<string>> = useParams();

  if (!id) return null;
  const { sessionInfo, getRequest } = useCode(id);

  useEffect(() => {
    getRequest();
    console.log("Connection mounted");
  }, [id]);

  useEffect(() => {
    if (!socket) return;
    const handler = (newCode: NewCode) => {
      console.log("socket connected:", socket.connected);
      console.log("socket event", newCode);
      console.log("editorRef", editorViewRef.current);
      const view = editorViewRef.current;
      if (!view) return;

      const current = view.state.doc.toString();
      if (current === newCode.value) return;

      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: newCode.value,
        },
      });
    };

    socket.on("new-code", handler);

    return () => {
      socket.off("new-code", handler);
      console.log("disconnected new-code!");
    };
  }, [socket]);

  return (
    <>
      {isVisible && <СustomCursor x={mousePos.x} y={mousePos.y} />}
      {Object.entries(cursors).map(([userId, pos]) => (
        <СustomCursor key={userId} x={pos.x} y={pos.y} isOthers={true} />
      ))}
      <div
        style={{ height: "100vh", width: "100vw", cursor: "none" }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
      >
        <h1>Hello!</h1>
        <CodeRedacrtor
          content={sessionInfo?.content}
          editorViewRef={editorViewRef}
        />
      </div>
    </>
  );
}
