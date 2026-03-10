import { socket } from "./connection";
import type { Point } from "../types/interfaces";

export function useMouseMove() {
  const mouseMoveEv = ({ pos }: { pos: Point }) => {
    socket.emit("mouse-move", pos);
  };

  return mouseMoveEv;
}
