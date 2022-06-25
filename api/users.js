const { createHmac } = require("crypto");
const { users } = require("../models");
const Users = require("../controller/users");
const Bets = require("../controller/bets");
const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");

const rootURL = "/api/users/";
const secret = process.env.TOKEN_SECRET;

module.exports = function (app) {
  app.get(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await Users.getAllUsers();
      res.json(results);
    } catch (error) {
      console.log({ error });
      sendError(error);
    }
  });

  app.get(`${rootURL}search/:input`, authenticateToken, async (req, res) => {
    try {
      const results = await Users.userSearch(req.params.input);
      res.json(results);
    } catch (error) {
      sendError(error, res);
    }
  });

  app.post(rootURL, async (req, res) => {
    try {
      await Users.createUser(req.body);
      res.sendStatus(200);
    } catch (error) {
      sendError(error, res);
    }
  });

  app.put(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await Users.updateUserInfo(req.user.id, req.body);
      res.json(results);
    } catch (error) {
      sendError(error, res);
    }
  });

  //TODO
  app.put(`${rootURL}password-reset`, authenticateToken, async (req, res) => {
    const newPasswordHashed = createHmac("sha256", secret)
      .update(req.body.newPassword1)
      .digest("hex");
    const currentPasswordHashed = createHmac("sha256", secret)
      .update(req.body.currentPassword)
      .digest("hex");
    try {
      const results = await users.update(
        {
          password: newPasswordHashed,
        },
        {
          where: {
            id: req.user.id,
            password: currentPasswordHashed,
          },
        }
      );
      if (results[0] === 1) res.sendStatus(200);
      if (results[0] === 0) res.sendStatus(401);
    } catch (err) {
      sendError(err, res);
    }
  });

  app.get(
    `${rootURL}profile/:username`,
    authenticateToken,
    async (req, res) => {
      try {
        const user = await Users.getUserByUsername(req.params.username);
        const { id } = user.dataValues;
        const results = await Bets.getAllBetsByUserId(id);
        res.json({ bets: results, profileInfo: user });
      } catch (error) {
        console.log({ error });
        sendError(error, res);
      }
    }
  );
};
