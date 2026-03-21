import { useEffect, useState } from "react";
import { useSocket } from "../socket/socketContext";
import axios from "axios";
import type { SessionType } from "../types/interfaces";

export function useCode(id: string) {
  const [sessionInfo, setSessionInfo] = useState<SessionType>();
  const socket = useSocket();

  const getRequest = async () => {
    console.log("Use session info:", id);

    try {
      const response = await axios.get(`http://localhost:3000/sessions/${id}`);
      if (response.status === 200) {
        socket.emit("check-room", id, (exist: boolean, data: string) => {
          const sessionData: SessionType = { ...response.data.data };
          if (exist) {
            sessionData.content = data;
          }
          console.log("Use session info:", response.data.data);

          setSessionInfo(sessionData);
        });
        console.log("Use session info");
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

  useEffect(() => {
    const doRequest = () => {
      getRequest();
    };

    if (socket.connected) {
      doRequest();
    } else {
      socket.once("connect", doRequest);
    }

    return () => {
      socket.off("connect", doRequest);
    };
  }, [id, socket]);

  return { setSessionInfo, sessionInfo };
}
