const { createHmac } = require("crypto");
const { users } = require("../models");
const Users = require("../repository/users");
const Bets = require("../repository/bets");
const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");

const rootURL = "/api/users/";
const secret = process.env.TOKEN_SECRET;

module.exports = function (app) {
  app.get(rootURL, authenticateToken, async (_, res) => {
    try {
      const results = await Users.getAllUsers();
      res.json(results);
    } catch (error) {
      sendError(error);
    }
  });

  app.get(`${rootURL}search/`, authenticateToken, async (req, res) => {
    const limit = isNaN(Number(req.query.limit))
      ? undefined
      : Number(req.query.limit);
    try {
      const results = await Users.userSearch(
        req.query.search ?? "",
        limit,
        req.user.id
      );
      res.json(results);
    } catch (error) {
      console.log({ error });
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

  app.patch(rootURL, authenticateToken, async (req, res) => {
    try {
      if (
        Object.keys(req.body).some((key) =>
          ["id", "username", "password"].includes(key)
        )
      ) {
        const error = new Error("Cannot update username or password");
        error.code = 403;
        throw error;
      }
      const results = await Users.updateUserInfo(req.user.id, req.body);
      res.json(results);
    } catch (error) {
      sendError(error, res);
    }
  });

  //TODO
  app.patch(`${rootURL}password-reset`, authenticateToken, async (req, res) => {
    if (!req.body.password1 || !req.body.password2)
      return res.status(400).send("bad request");
    if (req.body.password1 !== req.body.password2)
      return res.status(400).send("new passwords do not match");
    try {
      const newPasswordHashed = createHmac("sha256", secret)
        .update(req.body.password1)
        .digest("hex");
      const currentPasswordHashed = createHmac("sha256", secret)
        .update(req.body.currentPassword)
        .digest("hex");
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
      if (results[0] === 0)
        res.status(401).send("current password is incorrect");
      res.sendStatus(200);
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
        const results = await Bets.getAllBetsByUserId(user.id);
        res.json({ bets: results, profileInfo: user });
      } catch (error) {
        sendError(error, res);
      }
    }
  );
};
