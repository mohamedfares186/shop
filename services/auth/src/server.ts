import "dotenv/config";
import app from "./app.ts";
import { logger } from "./middleware/logger.ts";
import env from "./config/env.ts";
import { dbConnection } from "./config/db.ts";
import "./models/index.ts";

const { PORT } = env;

app.listen(PORT, async () => {
  await dbConnection();
  logger.info(`Server is running on port: ${PORT}`);
});
