import type { Request, Response } from "express";
import LoginService from "../services/login.ts";
import Tokens from "../utils/Token.ts";
import Session from "../models/sessions.ts";
import env from "../config/env.ts";
import { logger } from "../middleware/logger.ts";
import { v4 as uuidv4 } from "uuid";

const { ENV } = env;

class LoginController {
  constructor(protected loginService = new LoginService()) {
    this.loginService = loginService;
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body;

      const result = await this.loginService.login({ username, password });

      if (!result.success || !result.user) {
        return res.status(401).json({
          success: false,
          message: result.message,
        });
      }

      const accessToken = Tokens.access(result.user);
      const refreshToken = Tokens.refresh(result.user.userId);

      const sessionId = uuidv4();
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

      await Session.create({
        sessionId,
        userId: result.user.userId,
        token: refreshToken,
        expiresAt,
        isRevoked: false,
      });

      res.cookie("access-token", accessToken, {
        httpOnly: true,
        secure: ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });

      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
      });
    } catch (error) {
      logger.error(`Error logging user in: ${error}`);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
}

export default LoginController;
