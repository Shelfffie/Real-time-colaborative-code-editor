import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import type { Point } from "../types/interfaces";

export function useOtherCursors(socket: Socket | null) {
  const [cursors, setCursors] = useState<Record<string, Point>>({});

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
