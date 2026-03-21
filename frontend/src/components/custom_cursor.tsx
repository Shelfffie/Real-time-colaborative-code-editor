export function СustomCursor({
  x,
  y,
  isOthers = false,
  colour,
}: {
  x: number;
  y: number;
  isOthers?: boolean;
  colour?: string;
}) {
  return (
    <>
      <svg
        style={{
          position: "fixed",
          left: x,
          top: y,
          pointerEvents: "none",
          zIndex: 1000,
          transition: isOthers ? "all 0.5s ease" : "none",
        }}
        width="124"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2 L22 12 L13 14 L11 22 Z"
          fill={colour ? colour : "red"}
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </>
  );
}
