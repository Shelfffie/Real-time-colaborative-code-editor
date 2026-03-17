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
        [data.userId]: {
          ...prev[data.userId],
          x: data.pos.x,
          y: data.pos.y,
        },
      }));
    };

    const setColour = (data: any) => {
      console.log("colour:", data.colour);

      setCursors((prev) => ({
        [data.userId]: {
          ...prev[data.userId],
          colour: data.colour,
        },
      }));
    };

    socket.on("mouse-cords", handler);

    socket.on("user-colour", setColour);

    return () => {
      socket.off("mouse-cords", handler);
    };
  }, [socket]);

  return cursors;
}
