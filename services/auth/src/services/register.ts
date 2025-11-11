import { logger } from "../middleware/logger.ts";
import { v4 as uuidv4, type UUIDTypes } from "uuid";
import bcrypt from "bcryptjs";
import User from "../models/users.ts";
import type { RegisterCredentials } from "../types/credentials.ts";
import Tokens from "../utils/Token.ts";
import sendEmail from "../utils/email.ts";
import env from "../config/env.ts";
import { Op } from "sequelize";
import Role from "../models/roles.ts";

const { SECURE } = env;

class RegisterService {
  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const { firstName, lastName, email, username, password, dateOfBirth } =
        credentials;
      const check = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
        attributes: {
          include: ["password"],
        },
      });

      if (check) throw new Error("Invalid Email or Username");

      const role = await Role.findOne({ where: { level: 1234 } });
      const passwordHash: string = await bcrypt.hash(password, 12);
      const userId: UUIDTypes = uuidv4();

      if (role === null)
        throw new Error("Default roles has not been initialized");

      const newUser = await User.create({
        userId,
        firstName,
        lastName,
        email,
        username,
        password: passwordHash,
        roleId: role.roleId,
        dateOfBirth,
      });

      if (!newUser)
        throw new Error("Something went wrong, please try again later!");

      const token = Tokens.secure(userId as UUIDTypes, SECURE);

      const link = `http://localhost:5000/api/auth/email/${token}`;

      await sendEmail(
        newUser.email,
        "Verify your Email",
        `Click this link to verify your email: ${link}`
      );

      return newUser;
    } catch (error) {
      logger.error(`Error User Register: ${error}`);
      throw error;
    }
  }
}

export default RegisterService;
