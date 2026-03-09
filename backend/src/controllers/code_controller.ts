import db from "../config/database";
import type { Request, Response } from "express";
import type { ApiResponse, SessionType } from "../types/models";
import { responseHandler } from "../utils/res_handler";

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
    if (error instanceof Error) {
      console.error("Server error:", error.message);
      return responseHandler(res, 500, false, {
        "Server error": error.message,
      });
    } else {
      console.error("Unknown error:", error);
      return responseHandler(res, 500, false, { "Server error": error });
    }
  }
};

export { createCodeSession };
