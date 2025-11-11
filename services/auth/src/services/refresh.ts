import { logger } from "../middleware/logger.ts";
import Tokens from "../utils/Token.ts";
import type User from "../models/users.ts";
import Session from "../models/sessions.ts";
import { v4 as uuidv4, type UUIDTypes } from "uuid";

class RefreshService {
  async refresh(
    userId: UUIDTypes,
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const revokeToken = await Session.update(
        { token },
        { where: { userId } }
      );
      if (!revokeToken) throw new Error("Can't revoke token");

      const accessToken = Tokens.access({ userId } as User);
      const refreshToken = Tokens.refresh(userId);

      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const sessionId = uuidv4();
      const createToken = await Session.create({
        sessionId,
        userId,
        refreshToken,
        expiresAt,
        isRevoked: false,
      });
      if (!createToken) throw new Error("Can't create token");

      return { accessToken, refreshToken };
    } catch (error) {
      logger.error(`Error refreshing token service: ${error}`);
      throw error;
    }
  }
}

export default RefreshService;
