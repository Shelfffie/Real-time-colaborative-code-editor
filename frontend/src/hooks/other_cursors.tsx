import { useEffect, useState } from "react";
import { socket } from "../socket/connection";
import type { Point } from "../types/interfaces";

export function useOtherCursors() {
  const [cursors, setCursors] = useState<Record<string, Point>>({});

  useEffect(() => {
    socket.on("mouse-cords", (data) => {
      setCursors((prev) => ({
        ...prev,
        [data.userId]: { x: data.pos.x, y: data.pos.y },
      }));
    });
  }, []);

  return cursors;
}
