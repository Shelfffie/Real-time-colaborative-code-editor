import db from "../config/database";
import type { Request, Response } from "express";
import type { ApiResponse, SessionType } from "../types/models";
import { responseHandler, errorCatchHandler } from "../utils/res_handler";

const getVersion = async (
  req: Request<{ id: string; version: string }>,
  res: Response<ApiResponse<SessionType>>
) => {
  const id = parseInt(req.params.id);
  const version = parseInt(req.params.version);
  if (isNaN(id) || id <= 0 || isNaN(version) || version <= 0) {
    return responseHandler(res, 401, false, "Invalid id or version.");
  }
  try {
    const fetchQuery =
      "Select * from changes_history WHERE session_id=$1 AND version=$2";
    const data = await db.query(fetchQuery, [id, version]);

    if (data.rows.length === 0) {
      return responseHandler(res, 404, false, "Session or version not found.");
    }
    return responseHandler(res, 200, true, data.rows[0]);
  } catch (error) {
    errorCatchHandler(error, res);
  }
};

const getSessionHistory = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<SessionType[]>>
) => {
  const id = parseInt(req.params.id);
  console.log("Id:", id, "\n params id:", req.params.id);

  if (isNaN(id) || id <= 0) {
    return responseHandler(res, 401, false, "Invalid id.");
  }
  try {
    const fetchQuery = "Select * from changes_history WHERE session_id=$1";
    const data = await db.query(fetchQuery, [id]);
    if (data.rows.length === 0) {
      return responseHandler(res, 404, false, "Version of session not found.");
    }
    return responseHandler(res, 200, true, data.rows);
  } catch (error) {
    errorCatchHandler(error, res);
  }
};

export { getVersion, getSessionHistory };
