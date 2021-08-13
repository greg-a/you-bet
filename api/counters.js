const { bets, users, messages, counters } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/counters/';

module.exports = (app) => {
  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      await counters.create({
        userId: req.user.id,
        description: req.body.description,
        bet_amount: req.body.betAmount,
        end_date: req.body.endDate,
        betId: req.body.betId,
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
