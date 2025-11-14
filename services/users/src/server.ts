import app from "./app.ts";
import { logger } from "@services/shared/src/middleware/logger.ts";
import env from "./config/env.ts";
import { connectDB } from "./config/db.ts";
import "./models/index.ts";

const { PORT } = env;

await connectDB();
app.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));
