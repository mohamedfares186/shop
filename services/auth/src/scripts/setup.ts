import Roles from "./roles.ts";
import Permissions from "./permissions.ts";
import AdminUser from "./admin.ts";
import { logger } from "../middleware/logger.ts";

const admin = new AdminUser();

try {
  await Roles();
  await Permissions();
  await admin.Run();
} catch (error) {
  logger.error(error);
  throw error;
}
