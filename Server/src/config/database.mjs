import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "your_database_name",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mariadb",
    dialectOptions: {
      ssl: false,
      allowPublicKeyRetrieval: true,
    },
    logging: false, // Disables query logging
  }
);

// sequelize.sync({ force: true }) // ⚠ Deletes existing data
//   .then(() => console.log("Database re-synced ✅"));

export default sequelize;
