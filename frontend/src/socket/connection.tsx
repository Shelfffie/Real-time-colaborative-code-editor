import { io, Socket } from "socket.io-client";
import { useState, useRef, useEffect } from "react";

export function useSocket(url: string) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const s: Socket = io(url, {
      autoConnect: true,
      reconnection: true,
    });

    socketRef.current = s;

    s.on("connect", () => setIsConnected(true));
    s.on("disconnect", () => setIsConnected(false));

    return () => {
      s.disconnect();
    };
  }, [url]);

  return { socket: socketRef.current, isConnected };
}
