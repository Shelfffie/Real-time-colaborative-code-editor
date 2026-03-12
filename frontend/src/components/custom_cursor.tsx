export function СustomCursor({
  x,
  y,
  isOthers = false,
}: {
  x: number;
  y: number;
  isOthers?: boolean;
}) {
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
        background: isOthers ? "red" : "blue",
        transition: isOthers ? "all 0.5s ease" : "none",
      }}
    ></div>
  );
}
