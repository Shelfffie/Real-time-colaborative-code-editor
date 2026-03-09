import { useState } from "react";
import type { Point } from "../types/interfaces";

export function useCursor() {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return { mousePos, handleMouse };
}
