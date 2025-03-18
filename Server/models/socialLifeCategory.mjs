import { DataTypes } from "sequelize";
import sequelize from "../database.mjs";
import BotInteraction from "./BotInteraction.mjs";

const SocialLifeCategory = sequelize.define("SocialLifeCategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

BotInteraction.hasMany(SocialLifeCategory, { foreignKey: "botInteractionId", onDelete: "CASCADE" });
SocialLifeCategory.belongsTo(BotInteraction, { foreignKey: "botInteractionId" });

export default SocialLifeCategory;
