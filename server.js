require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./models');
const path = require('path');

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('./api/users')(app);
require('./api/login')(app);
require('./api/bets')(app);
require('./api/messages')(app);
require('./api/followers')(app);

const syncOptions = { force: false };

if (process.env.NODE_ENV === 'test') syncOptions.force = true;

// { force: true }
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;
