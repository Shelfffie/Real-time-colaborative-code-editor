import type { Response } from "express";

export const responseHandler = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  resData: string | T
) => {
  return res.status(statusCode).json({
    success: success,
    data: resData,
  });
};
