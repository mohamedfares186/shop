import type { UUIDTypes } from "uuid";
import sequelize from "../config/db.ts";
import { DataTypes, Model } from "sequelize";

class Product extends Model {
  declare productId: UUIDTypes;
  declare imagePath: string;
  declare title: string;
  declare description: Text;
  declare price: number;
  declare category: string;
  declare stock: number;
  declare available: boolean;
}

Product.init(
  {
    productId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: "Categories", key: "categoryId" },
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Products",
    timestamps: true,
    paranoid: true,
    indexes: [{ fields: ["title"] }],
    sequelize,
  }
);
