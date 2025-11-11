import { beforeAll, afterAll, beforeEach } from "@jest/globals";
import Role from "../../src/models/roles.ts";
import User from "../../src/models/users.ts";

export const initializeRoles = async () => {
  await Role.bulkCreate([
    { title: "admin", level: 9999 },
    { title: "user", level: 1234 },
  ]);
};

export const clearDatabase = async () => {
  await Role.destroy({ where: {}, truncate: true });
};

export const setupTestDatabase = async () => {
  await clearDatabase();
  await initializeRoles();
};

export const globalSetup = () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });
};

export const perTestSetup = () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });
};
