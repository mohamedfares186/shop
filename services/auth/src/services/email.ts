import sendEmail from "../utils/email.ts";
import Tokens from "../utils/Token.ts";
import env from "../config/env.ts";
import User from "../models/users.ts";
import type { UUIDTypes } from "uuid";

const { SECURE } = env;

class EmailService {
  async send(userId: UUIDTypes, email: string) {
    const token = Tokens.secure(userId as string, SECURE as string);

    const link = `http://localhost:5000/api/auth/email/${token}`;

    return await sendEmail(
      email,
      "Verify your Email",
      `Click this link to verify your email: ${link}`
    );
  }
  async verify(userId: UUIDTypes, token: string): Promise<boolean> {
    const check = await User.findOne({ where: { userId } });
    if (!check) throw new Error("Invalid Credentials");
    if (check.isVerified === true) throw new Error("Email is already verified");
    const validateToken = Tokens.validate(token, SECURE, 36000000);
    if (!validateToken) throw new Error("Invalid or expired token");
    check.isVerified = true;
    await check.save();
    return true;
  }
}

export default EmailService;
