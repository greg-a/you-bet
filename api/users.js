const { createHmac } = require("crypto");
const { users, bets } = require("../models");
const { Sequelize } = require("../models");
const { authenticateToken } = require("../utils/token");
const QueryHelpers = require("./queryHelpers");
const Op = Sequelize.Op;

const rootURL = "/api/users/";
const secret = process.env.TOKEN_SECRET;

module.exports = function (app) {
  app.get(rootURL, async (req, res) => {
    const results = await users.findAll({
      attributes: QueryHelpers.attributes.user,
    });
    res.json(results);
  });

  app.get(`${rootURL}:id`, async (req, res) => {
    const results = await users.findAll({
      attributes: QueryHelpers.attributes.user,
      where: {
        id: req.params.id,
      },
    });
    res.json(results);
  });

  app.get(`${rootURL}search/:input`, authenticateToken, async (req, res) => {
    const results = await users.findAll({
      attributes: QueryHelpers.attributes.user,
      where: {
        [Op.or]: [
          {
            username: { [Op.iLike]: `%${req.params.input.replace(" ", "_")}%` },
          },
          { name: `%${req.params.input}%` },
        ],
      },
    });
    res.json(results);
  });

  app.post(rootURL, async (req, res) => {
    if (req.body.username.includes(" ")) return res.sendStatus(500);
    const paramsClone = { ...req.body };
    paramsClone.username = paramsClone.username.trim().toLowerCase();
    paramsClone.password = createHmac("sha256", secret)
      .update(req.body.password)
      .digest("hex");
    try {
      const createUser = await users.create(paramsClone);
      console.log(createUser);
      res.send(createUser);
    } catch (e) {
      console.log({ error: e });
      if (e.name === "SequelizeUniqueConstraintError")
        return res.status(400).send(e.errors[0].message);
      return res.status(500).send("server error, try again shortly");
    }
  });

  app.put(rootURL, authenticateToken, async (req, res) => {
    if (Object.keys(req.body).some((key) => !["name"].includes(key)))
      return res.sendStatus(400);
    try {
      const results = await users.update(
        {
          ...req.body,
        },
        {
          where: {
            id: req.user.id,
          },
          returning: true,
        }
      );
      const [affectedRows, updatedUserInfo] = results;

      if (affectedRows === 0) return res.sendStatus(500);
      const { name } = updatedUserInfo[0];
      res.json({ name });
    } catch (error) {
      console.log({ error });
      if (e.name === "SequelizeUniqueConstraintError")
        return res.status(400).send(e.errors[0].message);
      return res.status(500).send("server error, try again shortly");
    }
  });

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
      res.sendStatus(500);
    }
  });

  app.get(
    `${rootURL}profile/:username`,
    authenticateToken,
    async (req, res) => {
      let profile = null;
      try {
        const response = await users.findOne({
          where: {
            username: req.params.username,
          },
        });
        profile = response;
      } catch (err) {
        res.sendStatus(500);
      }

      try {
        const results = await bets.findAll({
          where: {
            [Op.or]: [
              { mainUserId: profile.id },
              { acceptedUserId: profile.id },
            ],
          },
          order: [["createdAt", "DESC"]],
          include: [
            QueryHelpers.includes.acceptedUser,
            QueryHelpers.includes.mainUser,
            QueryHelpers.includes.messages,
          ],
        });
        res.json({ bets: results, profileInfo: profile });
      } catch (err) {
        res.sendStatus(500);
      }
    }
  );
};
