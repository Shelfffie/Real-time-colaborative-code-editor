import { useState } from "react";
import axios from "axios";
import { socket } from "../socket/connection";
import type { SessionType } from "../types/interfaces";

export function useCode(id: string) {
  const [sessionInfo, setSessionInfo] = useState<SessionType>();
  const getRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/sessions/${id}`);
      if (response.status === 200) {
        console.log("Successful!", response.data.data);
        setSessionInfo(response.data.data);
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

  return { setSessionInfo, sessionInfo, getRequest };
}
