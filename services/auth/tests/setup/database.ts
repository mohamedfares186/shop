import { User, Role, Session, Permission } from "../../src/models/index.ts";
import sequelize from "../../src/config/db.ts";

export const setupTestDatabase = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
};

export const initializeRoles = async () => {
  await Role.bulkCreate([
    { title: "admin", level: 9999 },
    { title: "user", level: 1234 },
  ]);
};

export const clearDatabase = async () => {
  await Role.destroy({ where: {}, truncate: true });
  await User.destroy({ where: {}, truncate: true });
  await sequelize.close();
};
