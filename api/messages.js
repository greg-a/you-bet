const { bets, users, messages } = require("../models");
const { Sequelize } = require("../models");
const { authenticateToken } = require("../utils/token");
const Op = Sequelize.Op;

const rootURL = "/api/messages/";

module.exports = (app) => {
  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await messages.create(
        {
          userId: req.user.id,
          betId: req.body.betId,
          message: req.body.message,
        },
        {
          returning: true,
        }
      );
      res.json(results);
    } catch (err) {
      console.log({ err });
      res
        .status(500)
        .send("Server error: could not save message. Try again shortly.");
    }
  });
};
