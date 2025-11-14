import express, { type RequestHandler } from "express";
import cors from "cors";
import router from "./routes/users.ts";
import requestLogger from "@services/shared/src/middleware/logger.ts";
import limiter from "@services/shared/src/middleware/limiter.ts";
import error from "@services/shared/src/middleware/error.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(requestLogger as RequestHandler);
app.use(limiter);

app.use("/users", router);

app.use(error);

export default app;
