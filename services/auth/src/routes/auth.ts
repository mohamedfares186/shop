import { Router } from "express";
import RegisterController from "../controllers/register.ts";
import LoginController from "../controllers/login.ts";
import LogoutController from "../controllers/logout.ts";
import RefreshController from "../controllers/refresh.ts";
import EmailController from "../controllers/email.ts";
import PasswordController from "../controllers/password.ts";

const router = Router();

const email = new EmailController();
const password = new PasswordController();

router.post("/register", new RegisterController().register);
router.post("/login", new LoginController().login);
router.post("/logout", new LogoutController().logout);
router.post("/refresh", new RefreshController().refresh);
router.post("/email", email.send);
router.post("/email/:token", email.verify);
router.post("/password/forget", password.forget);
router.post("/password/:token", password.reset);

export default router;
