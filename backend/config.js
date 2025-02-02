require("dotenv").config();

const {
  PORT = 3000,
  SECRET_JWT_KEY = "default_secret_key",
  DATABASE_URL = "postgresql://admin:admin@localhost:5432/tres60?schema=public",
} = process.env;

module.exports = { PORT, SECRET_JWT_KEY, DATABASE_URL };
