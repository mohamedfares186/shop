import { logger } from "@services/shared/src/middleware/logger.ts";
import User from "../models/users.ts";
import Role from "../models/roles.ts";

class CreateUserService {
  async create(user: User) {
    try {
      const {
        userId,
        firstName,
        lastName,
        email,
        username,
        password,
        dateOfBirth,
      } = user;

      let i: keyof User;

      for (i in user) {
        if (user[i] === undefined) {
          return `Missing required field: ${user[i]}`;
        }
      }

      const role = await Role.findOne({ where: { level: 1234 } });

      if (!role) {
        logger.error("Default role not found in database");
        return {
          success: false,
          message: "System configuration error. Please contact support.",
        };
      }

      const newUser: User = await User.create({
        userId,
        firstName,
        lastName,
        email,
        username,
        password,
        dateOfBirth,
        isVerified: false,
        roleId: role.roleId,
      });

      if (!newUser) return "Failed to create user.";

      return {
        success: true,
        message: "User has been created successfully",
      };
    } catch (error) {
      logger.error(`Error creating a new user: ${error}`);
      return null;
    }
  }
}

export default CreateUserService;
