import { useEffect, useState } from "react";
import { useSocket } from "../socket/socketContext";
import axios from "axios";
import type { SessionType } from "../types/interfaces";

export function useCode(id: string, name: string) {
  const [sessionInfo, setSessionInfo] = useState<SessionType>();
  const socket = useSocket();

  useEffect(() => {
    if (!id || !socket) return;
    console.log("id:", id, ", name:", name);

    const connectHandler = () => {
      console.log("You connected to server with id:", socket.id);
      socket.emit("join-room", id, name);
    };

    socket.on("connect", connectHandler);

    console.log("connected?:", socket.connected);

    if (socket.connected) {
      connectHandler();
      console.log("room:", id);
    }

    return () => {
      socket.off("connect", connectHandler);
      socket.disconnect();
      console.log("disconnected connect!");
    };
  }, [id, socket]);

  const getRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/sessions/${id}`);
      if (response.status === 200) {
        socket.emit("check-room", id, (exist: boolean, data: string) => {
          const sessionData: SessionType = { ...response.data.data };
          if (exist) {
            sessionData.content = data;
          }
          setSessionInfo(sessionData);
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

  return { setSessionInfo, sessionInfo, getRequest };
}
