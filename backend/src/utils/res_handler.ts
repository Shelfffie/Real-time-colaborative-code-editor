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

export const errorCatchHandler = <T>(error: Error | unknown, res: Response) => {
  if (error instanceof Error) {
    console.error("Server error:", error.message);
    return responseHandler(res, 500, false, {
      "Server error": error.message,
    });
  } else {
    console.error("Unknown error:", error);
    return responseHandler(res, 500, false, { "Server error": error });
  }
};
