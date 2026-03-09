import { socket } from "../socket/connection";
import { useEffect } from "react";
import { СustomCursor } from "./custom_cursor";
import { useCursor } from "../hooks/use_curcor_point";

export default function Connection() {
  const { mousePos, handleMouse } = useCursor();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("You connected to server with id:", socket.id);
    });
  }, []);

  return (
    <>
      <СustomCursor x={mousePos.x} y={mousePos.y} />
      <div
        style={{ height: "100vh", width: "100vw", cursor: "none" }}
        onMouseMove={handleMouse}
      >
        <h1>Hello!</h1>
      </div>
    </>
  );
}
