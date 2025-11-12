import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import cookieParser from "cookie-parser";
import requestLogger from "./middleware/logger.ts";
import limiter from "./middleware/limiter.ts";
import error from "./middleware/error.ts";
import router from "./routes/auth.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger as RequestHandler);
app.use(limiter);

app.use("/api/v1/auth", router);

app.use(error as ErrorRequestHandler);

export default app;
