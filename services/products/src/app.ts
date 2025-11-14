import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import requestLogger from "@services/shared/src/middleware/logger.ts";
import error from "@services/shared/src/middleware/error.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(requestLogger as express.RequestHandler);

app.use(error as express.ErrorRequestHandler);

export default app;
