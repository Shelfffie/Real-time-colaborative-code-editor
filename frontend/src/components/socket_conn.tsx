import { socket } from "../socket/connection";
import { useEffect } from "react";
import { СustomCursor } from "./custom_cursor";
import { useCursor } from "../hooks/use_curcor_point";
import { useOtherCursors } from "../hooks/other_cursors";
import { useParams, type Params } from "react-router-dom";
import axios from "axios";

export default function Connection() {
  const { mousePos, handleMouse, isVisible, handleMouseLeave } = useCursor();
  const cursors = useOtherCursors();
  const { id }: Readonly<Params<string>> = useParams();

  useEffect(() => {
    const getRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/sessions/${id}`
        );
        if (response.status === 200) {
          console.log("Successful!");
          socket.on("connect", () => {
            console.log("You connected to server with id:", socket.id);
            socket.emit("join-room", id);
          });
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log(
            "Server error:",
            error.response ? error.response.data : error.message
          );
        } else {
          console.log("Unknown error:", error);
        }
      }
    };

    getRequest();
  }, []);

  useEffect(() => {}, []);

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
