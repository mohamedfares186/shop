import { logger } from "@services/shared/src/middleware/logger.ts";
import { v4 as uuidv4, type UUIDTypes } from "uuid";
import bcrypt from "bcryptjs";
import type { RegisterCredentials } from "../types/credentials.ts";
import Tokens from "../utils/Token.ts";
import sendEmail from "@services/shared/src/utils/email.ts";
import env from "../config/env.ts";
import type { User } from "../types/credentials.ts";

const { SECURE, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = env;

interface RegisterResult {
  success: boolean;
  message: string;
  user?: User;
  emailSent?: boolean;
}

class RegisterService {
  async register(credentials: RegisterCredentials): Promise<RegisterResult> {
    try {
      const { firstName, lastName, email, username, password, dateOfBirth } =
        credentials;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !username ||
        !password ||
        !dateOfBirth
      ) {
        return {
          success: false,
          message: "All fields are required",
        };
      }

      if (password.length < 8) {
        return {
          success: false,
          message: "Password must be at least 8 characters long",
        };
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const userId: UUIDTypes = uuidv4();

      const response = await fetch(
        "http://localhost:5001/api/v1/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            firstName,
            lastName,
            email,
            username,
            password: passwordHash,
            dateOfBirth,
          }),
        }
      );

      if (!response.ok) {
        return {
          success: false,
          message: "Failed to create user account",
        };
      }

      let emailSent = false;
      try {
        const token = Tokens.secure(userId as string, SECURE);
        const link = `http://localhost:5000/api/v1/auth/email/verify/${token}`;

        await sendEmail(
          email,
          "Verify your Email",
          `Click this link to verify your email: ${link}`,
          EMAIL_HOST as string,
          EMAIL_PORT as string,
          EMAIL_USER as string,
          EMAIL_PASS as string
        );
        emailSent = true;
      } catch (emailError) {
        logger.error(
          `Failed to send verification email to ${email}: ${emailError}`
        );
      }

      return {
        success: true,
        message: emailSent
          ? "Registration successful. Please check your email to verify your account."
          : "Registration successful, but we couldn't send the verification email. Please request a new one.",
        user: await response.json(),
      };
    } catch (error) {
      logger.error(`Error during user registration: ${error}`);
      return {
        success: false,
        message: "An error occurred during registration",
      };
    }
  }
}

export default RegisterService;
