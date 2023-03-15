const Users = require("../controller/users");
const queryHelpers = require("../repository/queryHelpers");
const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");

const rootURL = "/api/login/";

module.exports = function (app) {
  app.post(rootURL, async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      try {
        const results = await Users.login(req.body);
        res.json(results);
      } catch (error) {
        sendError(error, res);
      }
    } else {
      res.status(400).send("username or password is missing");
    }
  });

  app.get(`${rootURL}token/`, authenticateToken, async (req, res) => {
    try {
      const results = await Users.getUser(
        req.user.id,
        queryHelpers.attributes.userWithNotificationToken
      );
      const { notification_token, ...data } = results;
      res.json({
        ...data,
        hasNotificationToken: !!notification_token,
      });
    } catch (error) {
      sendError(error, res);
    }
  });

  app.get("/api/logout", authenticateToken, async (req, res) => {
    try {
      await Users.logout(req.user.id);
      res.sendStatus(200);
    } catch (error) {
      sendError(error, res);
    }
  });
};
