const { createHmac } = require("crypto");
const dotenv = require("dotenv");
const { users } = require("../models");
const { Sequelize } = require("../models");
const { authenticateToken, generateAccessToken } = require("../utils/token");
const queryHelpers = require("./queryHelpers");
const Op = Sequelize.Op;

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
          attributes: queryHelpers.attributes.user,
        });
        const userData = loggedInUser?.dataValues;
        if (!userData)
          return res.status(409).send("username or password is incorrect");
        console.log(userData);
        const token = generateAccessToken(userData);
        res.json({
          token,
          userData: userData,
        });
      } catch (err) {
        res.sendStatus(500);
        console.log(err);
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
        // attributes: ["id", "username", "first_name", "last_name", "email"], does not work properly with the attributes
      });
      if (userInfo.token === req.token) {
        res.json({
          id: userInfo.id,
          username: userInfo.username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
        });
      } else {
        res.sendStatus(403);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get("/api/logout", authenticateToken, async (req, res) => {
    try {
      await users.update(
        { token: null },
        {
          logging: false,
          where: {
            id: req.user.id,
          },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  });
};
