import { Router } from "express";
import RegisterController from "../controllers/register.ts";

const router = Router();

router.post("/register", new RegisterController().register);

export default router;
