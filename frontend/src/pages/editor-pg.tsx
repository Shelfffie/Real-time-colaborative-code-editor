import { useSocket } from "../socket/socketContext";
import { useEffect, useRef, useState } from "react";
import { СustomCursor } from "../components/custom_cursor";
import { useCursor } from "../hooks/use_curcor_point";
import { useOtherCursors } from "../hooks/other_cursors";
import { CodeRedacrtor } from "../components/code_redactor";
import { useCode } from "../hooks/useSessionInfo";
import type { EditorView } from "@codemirror/view";
import type { NewCode, VersionType } from "../types/interfaces";
import { GetNewVersion } from "../components/getNewVersion";
import { SaveChangesSession } from "../components/saveChanges";
import { UserInfo } from "../components/users_in_room_info";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useJoinRoom } from "../hooks/joinRoomSocket";

export default function Connection() {
  const { id } = useParams<string>();
  const socket = useSocket();
  const { mousePos, handleMouse, isVisible, handleMouseLeave } = useCursor();
  const editorViewRef = useRef<EditorView | null>(null);
  const cursors = useOtherCursors();
  const [version, setVersion] = useState<VersionType | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !location.state || !location.state?.name) {
      navigate("/");
    }
  }, [id, location.state]);

  useJoinRoom(id!, location.state?.name);
  const { setSessionInfo, sessionInfo, getRequest } = useCode(id!);

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
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        className="page"
      >
        <section className="add-info">
          <h1>{sessionInfo?.title}</h1>
          <SaveChangesSession
            content={editorViewRef?.current?.state.doc.toString() ?? ""}
            originalContent={sessionInfo?.content ?? ""}
            id={id!}
            setOriginalContent={setSessionInfo}
          />
          <UserInfo cursors={cursors} />
          <GetNewVersion id={id!} setVersion={setVersion} />
        </section>
        <main className="editor-section">
          <CodeRedacrtor
            content={sessionInfo?.content}
            editorViewRef={editorViewRef}
            version={version}
          />
        </main>
      </div>
    </>
  );
}
