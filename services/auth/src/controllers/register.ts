import Tokens from "../utils/Token.ts";
import env from "../config/env.ts";
import { logger } from "../middleware/logger.ts";
import RegisterService from "../services/register.ts";
import type { Request, Response } from "express";
import type { RegisterCredentials } from "../types/credentials.ts";

const { ENV } = env;

class RegisterController {
  constructor(protected user = new RegisterService()) {
    this.user = user;
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, email, username, password, dateOfBirth } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !dateOfBirth
    )
      return res.status(400).json({ message: "All fields are required" });

    let newUser;
    try {
      newUser = await this.user.register({
        firstName,
        lastName,
        email,
        username,
        password,
        dateOfBirth,
      } as RegisterCredentials);
    } catch (error) {
      logger.error(`Error User Register: ${error}`);
      if (error === "Invalid Email or Username")
        return res.status(409).json({ message: error });
      return res.status(500).json({ message: "Something went wrong" });
    }

    const accessToken = Tokens.access(newUser);
    const refreshToken = Tokens.refresh(newUser.userId);

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

    return res
      .status(201)
      .json({ message: "Registered successfully, please verify your email" });
  };
}

export default RegisterController;
