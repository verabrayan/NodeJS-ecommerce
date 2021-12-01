require("dotenv").config();

const config = {
  dev: process.env.MODE === "dev",
  port: process.env.PORT,
  password_db: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  jwt_password: process.env.JWT_PASSWORD,
};

module.exports = config;
