import { Sequelize } from "sequelize";
import { logger } from "@services/shared/src/middleware/logger.ts";
import type { Dialect, Options as SequelizeOptions } from "sequelize";
import env from "./env.ts";

const { ENV, DATABASE_URL } = env;

const PRODUCTION: boolean = ENV === "production" && !!DATABASE_URL;
const STAGING: boolean = ENV === "staging" && !!DATABASE_URL;
const DEVELOPMENT: boolean = ENV === "development";
const TEST: boolean = ENV === "test";
const DIALECT: Dialect = PRODUCTION || STAGING ? "postgres" : "sqlite";
const STROAGE: string =
  PRODUCTION || STAGING
    ? (DATABASE_URL as string)
    : TEST
    ? "database/test.sqlite3"
    : DEVELOPMENT
    ? "database/dev.sqlite3"
    : "database/local.sqlite3";

const database: SequelizeOptions = {
  dialect: DIALECT,
  storage: STROAGE,
};

const sequelize = new Sequelize(database);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    logger.info("Database has been connected and synced successfully");
  } catch (error) {
    logger.error(`Error connecting to the database: ${error}`);
  }
};

export default sequelize;
