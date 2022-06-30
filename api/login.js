const { createHmac } = require("crypto");
const { users } = require("../models");
const { authenticateToken, generateAccessToken } = require("../utils/token");
const queryHelpers = require("../controller/queryHelpers");
const { sendError } = require("./utils");

const rootURL = "/api/login/";
const secret = process.env.TOKEN_SECRET;

module.exports = function (app) {
  app.post(rootURL, async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      try {
        const hashedPassword = createHmac("sha256", secret)
          .update(password)
          .digest("hex");
        const loggedInUser = await users.findOne({
          logging: false,
          where: {
            username: username.toLowerCase(),
            password: hashedPassword,
          },
          attributes: queryHelpers.attributes.userWithNotificationToken,
        });
        if (!loggedInUser?.dataValues)
          return res.status(409).send("username or password is incorrect");
        const { notification_token, ...userData } = loggedInUser.dataValues;

        const token = generateAccessToken(userData);
        res.json({
          token,
          userData: {
            ...userData,
            hasNotificationToken: !!notification_token,
          },
        });
      } catch (err) {
        console.log(err);
        sendError(err, res);
      }
    } else res.status(400).send("username or password is missing");
  });

  app.get(`${rootURL}token/`, authenticateToken, async (req, res) => {
    try {
      const userInfo = await users.findOne({
        logging: false,
        where: {
          id: req.user.id,
        },
        attributes: queryHelpers.attributes.userWithNotificationToken,
      });
      const { notification_token, ...data } = userInfo.dataValues;
      res.json({
        ...data,
        hasNotificationToken: !!notification_token,
      });
    } catch (e) {
      console.log(e);
      sendError(e, res);
    }
  });

  app.get("/api/logout", authenticateToken, async (req, res) => {
    try {
      await users.update(
        { notification_token: null },
        {
          logging: false,
          where: {
            id: req.user.id,
          },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      sendError(err, res);
    }
  });
};
