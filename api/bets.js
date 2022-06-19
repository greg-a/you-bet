const { bets, users, messages, followers } = require("../models");
const { Sequelize } = require("../models");
const { authenticateToken } = require("../utils/token");
const QueryHelpers = require("./queryHelpers");
const Op = Sequelize.Op;

const rootURL = "/api/bets/";

module.exports = (app) => {
  app.get(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await followers.findAll({
        where: {
          mainUserId: req.user.id,
        },
      });
      followList = [
        req.user.id,
        ...results.map(({ followedUserId }) => followedUserId),
      ];
    } catch (err) {
      console.log(err);
    }

    try {
      const results = await bets.findAll({
        where: {
          mainUserId: followList,
          end_date: {
            [Op.gte]: new Date(),
          },
        },
        order: [
          ["createdAt", "DESC"],
          [messages, "createdAt", "DESC"],
        ],
        include: [
          QueryHelpers.includes.mainUser,
          QueryHelpers.includes.messages,
          QueryHelpers.includes.bets,
          QueryHelpers.includes.acceptedUser,
        ],
      });
      res.json(results);
    } catch (e) {
      console.log({ error: e });
      if (e.name === "SequelizeUniqueConstraintError")
        return res.status(400).send(e.errors[0].message);
      return res.status(500).send("server error, try again shortly");
    }
  });

  app.get(`${rootURL}profile/:userId?`, authenticateToken, async (req, res) => {
    try {
      const profileId = Number(req.params?.userId) || req.user.id;
      const results = await bets.findAll({
        where: {
          mainUserId: profileId,
        },
        order: [
          ["createdAt", "DESC"],
          [messages, "createdAt", "DESC"],
        ],
        include: [
          QueryHelpers.includes.mainUser,
          QueryHelpers.includes.messages,
          QueryHelpers.includes.bets,
          QueryHelpers.includes.acceptedUser,
        ],
      });
      res.json(results);
    } catch (error) {
      console.log({ error });
    }
  });

  app.get(`${rootURL}history/:userId`, authenticateToken, async (req, res) => {
    try {
      const results = await bets.findAll({
        where: {
          mainUserId: req.params.userId,
          end_date: {
            [Op.lt]: new Date(),
          },
        },
      });
      res.json(results);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      await bets.create({
        mainUserId: req.user.id,
        description: req.body.description,
        bet_amount: req.body.betAmount,
        end_date: req.body.endDate,
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.put(`${rootURL}accept/:id`, authenticateToken, async (req, res) => {
    try {
      const results = await bets.update(
        {
          acceptedUserId: req.user.id,
        },
        {
          where: {
            id: req.params.id,
            acceptedUserId: null,
          },
          returning: true,
        }
      );
      const [affectedRows, acceptedBet] = results;

      if (affectedRows === 0)
        return res
          .status(409)
          .send(
            "Could not accept bet, it's possible the bet is already accepted"
          );
      res.json(acceptedBet[0]);
    } catch (err) {
      console.log({ err });
      res.sendStatus(500);
    }
  });

  app.put(`${rootURL}:id`, authenticateToken, async (req, res) => {
    try {
      await bets.update(
        {
          description: req.body.description,
          bet_amount: req.body.betAmount,
          end_date: req.body.endDate,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get(`${rootURL}:betId`, async (req, res) => {
    try {
      const response = await bets.findOne({
        where: {
          id: req.params.betId,
        },
        include: [
          QueryHelpers.includes.mainUser,
          QueryHelpers.includes.messages,
          QueryHelpers.includes.bets,
          QueryHelpers.includes.acceptedUser,
        ],
        order: [[messages, "createdAt", "DESC"]],
      });
      if (!response) return res.status(404).send("Bet not found");
      res.json(response);
    } catch (e) {
      console.log({ e });
      res.status(500).send("Could not find bet. Try again shortly");
    }
  });

  app.get(`${rootURL}:username/bet/:betId`, async (req, res) => {
    let userId;
    if (req.params.username) {
      try {
        const response = await users.findOne({
          where: {
            username: req.params.username,
          },
        });
        userId = response.id;
      } catch (err) {
        res.sendStatus(400);
      }
    }
    try {
      const results = await bets.findOne({
        where: {
          id: req.params.betId,
          mainUserId: userId,
        },
        include: [
          QueryHelpers.includes.mainUser,
          QueryHelpers.includes.messages,
          QueryHelpers.includes.bets,
          QueryHelpers.includes.acceptedUser,
        ],
        order: [[messages, "createdAt", "DESC"]],
      });
      res.json(results);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.delete(`${rootURL}delete/:betId`, authenticateToken, async (req, res) => {
    try {
      await bets.destroy({
        where: {
          id: req.params.betId,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      console.log(err);
    }
  });
};
