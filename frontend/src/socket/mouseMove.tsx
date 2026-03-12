import type { Socket } from "socket.io-client";
import type { Point } from "../types/interfaces";

export function useMouseMove(socket: Socket | null) {
  if (!socket) return;
  const mouseMoveEv = ({ pos }: { pos: Point }) => {
    socket.emit("mouse-move", pos);
  };

  return mouseMoveEv;
}
