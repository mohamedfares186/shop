import "dotenv/config";
import app from "./app.ts";
import { logger } from "./middleware/logger.ts";
import { connect } from "./config/db.ts";
import "./models/products.ts";

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  await connect();
  logger.info(`Server is running on port: ${PORT}`);
});
