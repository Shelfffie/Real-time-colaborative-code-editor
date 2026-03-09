import type { Point } from "../types/interfaces";

export function СustomCursor({ x, y }: Point) {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: "3rem",
        height: "3rem",
        border: "2px solid black",
        margin: 0,
        padding: 0,
        borderRadius: "50%",
        pointerEvents: "none",
        background: "red",
      }}
    ></div>
  );
}
