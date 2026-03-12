import { useEffect, useState } from "react";
import { useSocket } from "../socket/socketContext";
import type { Point } from "../types/interfaces";

export function useOtherCursors() {
  const [cursors, setCursors] = useState<Record<string, Point>>({});
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handler = (data: any) => {
      console.log(data);

      setCursors((prev) => ({
        ...prev,
        [data.userId]: { x: data.pos.x, y: data.pos.y },
      }));
    };

    socket.on("mouse-cords", handler);

    return () => {
      socket.off("mouse-cords", handler);
    };
  }, [socket]);

  return cursors;
}
