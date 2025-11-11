import { logger } from "./logger.ts";
import type { UserRequest, ResponseError } from "../types/request.ts";
import type { NextFunction, Response } from "express";

const error = (
  err: ResponseError,
  req: UserRequest,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) => {
  const userId = req.user?.userId || "Anonymous";
  const role = req.user?.roleId || "Guest";
  const { message, stack, statusCode, status } = err;
  const { method, url, hostname } = req;

  const error = `
    ${method} Request to ${hostname}${url}
    Status: ${status} - ${message}
    Status Code: ${statusCode}
    User: ${userId}
    Role: ${role}
    Error Stack: ${stack}
  `;

  if (statusCode >= 500) {
    logger.error(`Server Error: ${error}`);
  }

  if (statusCode >= 400) {
    logger.warn(`Client Error: ${error}`);
  }

  return res
    .status(statusCode || 500)
    .json({ message: message || "Internal server error" });
};

export default error;
