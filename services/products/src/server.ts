import "dotenv/config";
import app from "./app.ts";
import { logger } from "@services/shared/src/middleware/logger.ts";
import { connectDB } from "./config/db.ts";
import "./models/products.ts";

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  await connectDB();
  logger.info(`Server is running on port: ${PORT}`);
});
