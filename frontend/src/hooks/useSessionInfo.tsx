import { useState } from "react";
import { useSocket } from "../socket/socketContext";
import axios from "axios";
import type { SessionType } from "../types/interfaces";
export function useCode(id: string) {
  const [sessionInfo, setSessionInfo] = useState<SessionType>();
  const socket = useSocket();

  const getRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/sessions/${id}`);
      if (response.status === 200) {
        socket.emit("check-room", id, (exist: boolean, data: string) => {
          const sessionData: SessionType = { ...response.data.data };
          if (exist) {
            sessionData.content = data;
          }
          console.log(response.data.data);

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
