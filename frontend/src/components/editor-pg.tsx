import { useSocket } from "../socket/socketContext";
import { useEffect, useRef, useState } from "react";
import { СustomCursor } from "./custom_cursor";
import { useCursor } from "../hooks/use_curcor_point";
import { useOtherCursors } from "../hooks/other_cursors";
import { CodeRedacrtor } from "./code_redactor";
import { useCode } from "../hooks/use_code";
import type { EditorView } from "@codemirror/view";
import type { NewCode, VersionType } from "../types/interfaces";
import { GetNewVersion } from "./getNewVersion";
import { SaveChangesSession } from "./saveChanges";
import { UserInfo } from "./users_in_room_info";

export default function Connection({ id, name }: { id: string; name: string }) {
  const socket = useSocket();
  const { mousePos, handleMouse, isVisible, handleMouseLeave } = useCursor();
  const editorViewRef = useRef<EditorView | null>(null);
  const cursors = useOtherCursors();
  const [version, setVersion] = useState<VersionType | null>(null);

  if (!id) return null;
  const { sessionInfo, getRequest } = useCode(id, name);

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
        <СustomCursor
          key={userId}
          x={pos.x}
          y={pos.y}
          isOthers={true}
          colour={pos.colour}
        />
      ))}
      <div
        style={{ height: "100vh", width: "100vw", cursor: "none" }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
      >
        <CodeRedacrtor
          content={sessionInfo?.content}
          editorViewRef={editorViewRef}
          version={version}
        ></CodeRedacrtor>
        <GetNewVersion id={id} setVersion={setVersion} />
        <SaveChangesSession
          content={editorViewRef?.current?.state.doc.toString() ?? ""}
          originalContent={sessionInfo?.content ?? ""}
          id={id}
        />
        <UserInfo cursors={cursors} />
      </div>
    </>
  );
}
