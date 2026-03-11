import { socket } from "../socket/connection";
import { useEffect } from "react";
import { СustomCursor } from "./custom_cursor";
import { useCursor } from "../hooks/use_curcor_point";
import { useOtherCursors } from "../hooks/other_cursors";
import { useParams, type Params } from "react-router-dom";
import { CodeRedacrtor } from "./code_redactor";
import { useCode } from "../hooks/use_code";

export default function Connection() {
  const { mousePos, handleMouse, isVisible, handleMouseLeave } = useCursor();
  const cursors = useOtherCursors();
  const { id }: Readonly<Params<string>> = useParams();

  if (!id) return null;
  const { setSessionInfo, sessionInfo, getRequest } = useCode(id);

  useEffect(() => {
    getRequest();
  }, []);

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
          setSessionInfo={setSessionInfo}
        />
      </div>
    </>
  );
}
