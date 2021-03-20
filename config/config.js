require("dotenv").config();

module.exports = {
  development: {
    username: "gregallebach",
    password: process.env.password,
    database: "you_bet",
    host: "localhost",
    dialect: "postgres"
  },
  test: {
    username: "gregallebach",
    password: process.env.password,
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
