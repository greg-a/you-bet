const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("./controller/users")(app);
require("./controller/login")(app);
require("./controller/bets")(app);
require("./controller/messages")(app);
require("./controller/followers")(app);

module.exports = app;
