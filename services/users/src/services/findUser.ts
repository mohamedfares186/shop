import { logger } from "@services/shared/src/middleware/logger.ts";
import User from "../models/users.ts";
import { Op } from "sequelize";

class FindUserService {
  async find(user: User) {
    try {
      const { email, username } = user;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });

      if (existingUser) {
        return {
          success: true,
          message: "User found",
          user: existingUser,
        };
      }

      return {
        success: false,
        message: "Invalid Credentials",
      };
    } catch (error) {
      logger.error(`Error retrieving user data: ${error}`);
      return null;
    }
  }
}

export default FindUserService;
