import type { Request, Response } from "express";
import type { UUIDTypes } from "uuid";

interface UserRequest extends Request {
  user?: {
    userId: UUIDTypes;
    roleId: UUIDTypes;
    isVerified: boolean;
  };
}

interface UserResponse extends Response {
  message: string;
}

interface ResponseError extends Error {
  statusCode: number;
  status: string;
}

export type { UserRequest, UserResponse, ResponseError };
