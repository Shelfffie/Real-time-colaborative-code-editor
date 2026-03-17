import { useEffect, useState } from "react";
import { useSocket } from "../socket/socketContext";
import type { Point } from "../types/interfaces";

export function useOtherCursors() {
  const [cursors, setCursors] = useState<Record<string, Point>>({});
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handler = (data: any) => {
      setCursors((prev) => ({
        ...prev,
        [data.userId]: {
          ...prev[data.userId],
          x: data.pos.x,
          y: data.pos.y,
        },
      }));
    };

    const setColourName = (data: any) => {
      setCursors((prev) => ({
        ...prev,
        [data.userId]: {
          ...prev[data.userId],
          colour: data.colour,
          name: data.name,
        },
      }));
    };

    const leaveRoom = (data: any) => {
      setCursors((prev) => {
        const { [data.userId]: _, ...rest } = prev;
        return rest;
      });
    };

    const initUsers = (users: any[]) => {
      const mapped: Record<string, Point> = {};

      for (const user of users) {
        console.log("users and their cursors:", user);
        mapped[user.userId] = {
          x: 0,
          y: 0,
          name: user.name,
          colour: user.colour,
        };
      }

      setCursors(mapped);
    };

    socket.on("mouse-cords", handler);
    socket.on("user-colour", setColourName);
    socket.on("new-user", initUsers);
    socket.on("leave-room", leaveRoom);

    return () => {
      socket.off("mouse-cords", handler);
      socket.off("user-colour", setColourName);
      socket.off("new-user", initUsers);
      socket.off("leave-room", leaveRoom);
    };
  }, [socket]);

  return cursors;
}
