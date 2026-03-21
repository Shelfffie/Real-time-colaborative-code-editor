import { useEffect } from "react";
import { useSocket } from "../socket/socketContext";

export function useJoinRoom(id: string, name: string) {
  const socket = useSocket();
  useEffect(() => {
    if (!id || !socket || !name) return;
    console.log("id:", id, ", name:", name);

    const connectHandler = () => {
      console.log("You connected to server with id:", socket.id);
      socket.emit(
        "join-room",
        { id, name },
        (result: string, success: boolean) => {
          if (success) {
            console.log("Socket connection is successed!:", result);
          } else {
            console.log("Error occured during connection:", result);
          }
        }
      );
    };

    socket.on("connect", connectHandler);

    console.log("connected?:", socket.connected);

    if (socket.connected) {
      connectHandler();
      console.log("room:", id);
    }

    return () => {
      socket.off("connect", connectHandler);
      console.log("disconnected connect!");
    };
  }, [id, socket, name]);
}
