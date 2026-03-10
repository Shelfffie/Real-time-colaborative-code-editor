import db from "../config/database";
import type { Request, Response } from "express";
import type { ApiResponse, SessionType } from "../types/models";
import { responseHandler, errorCatchHandler } from "../utils/res_handler";

const createCodeSession = async (
  req: Request,
  res: Response<ApiResponse<SessionType>>
) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return responseHandler(
        res,
        401,
        false,
        "Bad request: Required fields are not filled in!"
      );
    }
    const insertQuery =
      "INSERT INTO sessions (title, content) VALUES ($1, $2) RETURNING *";
    const result = await db.query(insertQuery, [title, content]);
    return responseHandler(res, 200, true, result.rows[0]);
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

    const insertQuery = "Select * from sessions where id=$1";
    const data = await db.query(insertQuery, [id]);

    if (data.rows.length === 0) {
      return responseHandler(res, 404, false, "Session not found.");
    }

    return responseHandler(res, 200, true, data.rows[0]);
  } catch (error) {
    errorCatchHandler(error, res);
  }
};

export { createCodeSession, getCodeSession };
