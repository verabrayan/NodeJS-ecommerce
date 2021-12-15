require("dotenv").config();

const config = {
  dev: process.env.MODE === "dev",
  port: process.env.PORT,
  password_db: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  jwt_password: process.env.JWT_PASSWORD,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  rol:process.env.ROL
};

module.exports = config;
