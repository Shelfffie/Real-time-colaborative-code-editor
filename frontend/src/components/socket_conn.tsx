import { socket } from "../socket/connection";
import { useEffect } from "react";
import { СustomCursor } from "./custom_cursor";
import { useCursor } from "../hooks/use_curcor_point";
import { useOtherCursors } from "../hooks/other_cursors";

export default function Connection() {
  const { mousePos, handleMouse, isVisible, handleMouseLeave } = useCursor();
  const cursors = useOtherCursors();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("You connected to server with id:", socket.id);
    });
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
      </div>
    </>
  );
}
