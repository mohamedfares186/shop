import { logger } from "@services/shared/src/middleware/logger.ts";
import Role from "../models/roles.ts";

const Roles = async () => {
  try {
    return await Role.bulkCreate([
      { title: "admin", level: 9999 },
      { title: "user", level: 1234 },
    ]);
  } catch (error) {
    logger.error(`Error initiating default roles: ${error}`);
    throw error;
  }
};

export default Roles;
