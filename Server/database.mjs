import { Sequelize } from "sequelize";

const sequelize = new Sequelize("MentourMe", "root", "", {
  host: "localhost",
  dialect: "mariadb", // Use "mysql" if not using MariaDB
  logging: false, // Disable logging SQL queries
});

export default sequelize;
