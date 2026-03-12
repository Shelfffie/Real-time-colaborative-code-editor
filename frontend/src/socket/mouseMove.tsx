import { useSocket } from "./socketContext";
import type { Point } from "../types/interfaces";

export function useMouseMove() {
  const socket = useSocket();
  if (!socket) return;
  const mouseMoveEv = ({ pos }: { pos: Point }) => {
    socket.emit("mouse-move", pos);
  };

  return mouseMoveEv;
}
