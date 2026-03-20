import type { Point } from "../types/interfaces";

export function UserInfo({ cursors }: { cursors: Record<string, Point> }) {
  return (
    <section className="users-in-room-section">
      <h2>Other users in the session:</h2>
      {Object.keys(cursors).length > 0 ? (
        <ul className="users">
          {Object.entries(cursors).map(([userId, pos]) => (
            <li key={userId} className="other-user">
              <div
                className="color-square"
                style={{ background: pos.colour }}
              />
              <p>{pos.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">It's empty here for now...</p>
      )}
    </section>
  );
}
