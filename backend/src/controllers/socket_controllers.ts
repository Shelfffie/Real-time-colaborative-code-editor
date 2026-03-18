import { callbackify } from "node:util";
import db from "../config/database";

export const saveChanges = async (
  id: number,
  content: string,
  description: string,
  name: string,
  callback: (result: string, success: boolean) => void
) => {
  try {
    await db.query("BEGIN");
    const putQuery = "UPDATE sessions SET content=$1 WHERE id=$2 RETURNING *";
    const data = await db.query(putQuery, [content, id]);
    const session = data.rows[0];
    const copyQuery =
      "INSERT INTO changes_history (session_id, title, content, version, description) VALUES($1, $2, $3, COALESCE((SELECT MAX(version) FROM changes_history WHERE session_id=$1), 0) + 1, $4 )";
    await db.query(copyQuery, [
      session.id,
      session.title,
      content,
      description,
    ]);
    await db.query("COMMIT");
    callback("Success!", true);
  } catch (error) {
    await db.query("ROLLBACK");
    callback(
      error instanceof Error
        ? ` "Server error": ${error.message}`
        : `Unknown error: ${error}`,
      false
    );
  }
};
