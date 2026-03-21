import db from "../config/database";
import type { Request, Response } from "express";
import type { ApiResponse, SessionType } from "../types/models";
import { responseHandler, errorCatchHandler } from "../utils/res_handler";

const createCodeSession = async (
  req: Request,
  res: Response<ApiResponse<SessionType>>
) => {
  try {
    const { title, content, password } = req.body;
    console.log(req.body);

    if (!title) {
      return responseHandler(
        res,
        401,
        false,
        "Bad request: Required fields are not filled in!"
      );
    }
    const insertQuery =
      "INSERT INTO sessions (title, content, password) VALUES ($1, $2, $3) RETURNING id, title, content";
    const result = await db.query(insertQuery, [title, content, password]);
    console.log("create new row. Go to copy creating...");

    const sessionInfo = result.rows[0];
    const copyQuery =
      "INSERT INTO changes_history (session_id, title, content, version, description) VALUES($1, $2, $3, $4, $5)";
    await db.query(copyQuery, [
      sessionInfo.id,
      title,
      content,
      1,
      "first version",
    ]);
    return responseHandler(res, 200, true, sessionInfo);
  } catch (error: unknown) {
    errorCatchHandler(error, res);
  }
};

const getCodeSession = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<SessionType>>
) => {
  const id: number = parseInt(req.params.id);
  try {
    if (isNaN(id) || id <= 0) {
      return responseHandler(res, 401, false, "Invalid id.");
    }

    const insertQuery =
      "SELECT id, title, content, created_at, updated_at from sessions where id=$1";
    const data = await db.query(insertQuery, [id]);

    if (data.rows.length === 0) {
      return responseHandler(res, 404, false, "Session not found.");
    }

    return responseHandler(res, 200, true, data.rows[0]);
  } catch (error) {
    errorCatchHandler(error, res);
  }
};

const handleCheking = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<boolean>>
) => {
  const id = parseInt(req.params.id);
  const { password, name } = req.body;

  if (isNaN(id) || id <= 0) {
    return responseHandler(res, 401, false, "Invalid id.");
  }

  if (!name || name.trim() === "") {
    return responseHandler(res, 401, false, "The name must be filled in!");
  }

  try {
    const requestQeury = "SELECT password FROM sessions WHERE id=$1";

    const data = await db.query(requestQeury, [id]);

    const dbPassword = data.rows[0].password ?? "";
    if (password !== dbPassword) {
      return responseHandler(res, 401, false, "Invalid password!");
    }

    return responseHandler(res, 200, true, true);
  } catch (error) {
    errorCatchHandler(error, res);
  }
};

export { createCodeSession, getCodeSession, handleCheking };
