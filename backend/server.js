require("dotenv").config();
const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 8080;

const syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
