import Permission from "../models/permissions.ts";
import Role from "../models/roles.ts";
import { logger } from "@services/shared/src/middleware/logger.ts";
import type { UUIDTypes } from "uuid";

const Permissions = async () => {
  try {
    const admin: Role | null = await Role.findOne({
      where: { title: "admin" },
    });

    const user: Role | null = await Role.findOne({
      where: { title: "user" },
    });

    if (admin === null || user === null)
      throw new Error("Default Roles has not been initialized");

    const adminRoleId: UUIDTypes = admin.roleId;
    const userRoleId: UUIDTypes = user.roleId;

    return await Permission.bulkCreate([
      { action: "create", roleId: adminRoleId, category: "product" },
      { action: "update", roleId: adminRoleId, category: "product" },
      { action: "read", roleId: adminRoleId, category: "product" },
      { action: "delete", roleId: adminRoleId, category: "product" },
      { action: "read", roleId: userRoleId, category: "product" },
    ]);
  } catch (error) {
    logger.error(`Error initiating default permissions: ${error}`);
    throw error;
  }
};

export default Permissions;
