require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "you_bet",
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "you_bet",
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "postgres"
  }
};
