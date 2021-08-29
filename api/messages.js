const { bets, users, messages } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/messages/';

module.exports = (app) => {
  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      await messages.create({
        userId: req.user.id,
        betId: req.body.betId,
        message: req.body.message,
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
