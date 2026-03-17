import type { Point } from "../types/interfaces";

export function UserInfo({ cursors }: { cursors: Record<string, Point> }) {
  return (
    <div>
      <h2>Other users in the session:</h2>
      {Object.keys(cursors).length > 0 && (
        <ul>
          {Object.entries(cursors).map(([userId, pos]) => (
            <li key={userId}>
              <p>Name: {pos.name}</p>
              <p>Colour:</p>
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  border: "2px solid black",
                  borderRadius: "50%",
                  margin: 0,
                  padding: 0,
                  background: pos.colour,
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
