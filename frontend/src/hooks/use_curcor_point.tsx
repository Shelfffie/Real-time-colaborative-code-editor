import { useEffect, useState } from "react";
import type { Point } from "../types/interfaces";
import { useMouseMove } from "../socket/mouseMove";
import { useThrottle } from "../hooks/throttle";

export function useCursor() {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const throttlePos = useThrottle({
    value: mousePos,
    interval: 10,
  });
  const mouseMoveEv = useMouseMove();

  useEffect(() => {
    if (throttlePos !== null) {
      mouseMoveEv({ pos: throttlePos });
    }
  }, [throttlePos]);

  const handleMouse = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return { mousePos, handleMouse, isVisible, handleMouseLeave };
}
