import { Router } from "express";
import RegisterController from "../controllers/register.ts";
import LoginController from "../controllers/login.ts";
import LogoutController from "../controllers/logout.ts";
import RefreshController from "../controllers/refresh.ts";
import EmailController from "../controllers/email.ts";
import PasswordController from "../controllers/password.ts";
import authenticate from "../middleware/isAuthenticated.ts";
import registerValidation from "../validation/register.ts";
import loginValidation from "../validation/login.ts";
import logoutValidation from "../validation/logout.ts";
import refreshValidation from "../validation/refresh.ts";
import emailVerificationValidation from "../validation/email.ts";
import {
  forgetPasswordValidation,
  resetPasswordValidation,
} from "../validation/password.ts";

const router = Router();

const email = new EmailController();
const password = new PasswordController();

router.post("/register", registerValidation, new RegisterController().register);
router.post("/login", loginValidation, new LoginController().login);
router.post(
  "/logout",
  logoutValidation,
  authenticate,
  new LogoutController().logout
);
router.post(
  "/refresh",
  refreshValidation,
  authenticate,
  new RefreshController().refresh
);
router.post("/email/resend", authenticate, email.resend);
router.post("/email/verify/:token", emailVerificationValidation, email.verify);
router.post("/password/forget", forgetPasswordValidation, password.forget);
router.post("/password/reset/:token", resetPasswordValidation, password.reset);

export default router;
