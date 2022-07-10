const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./api/users")(app);
require("./api/login")(app);
require("./api/bets")(app);
require("./api/messages")(app);
require("./api/followers")(app);

module.exports = app;
