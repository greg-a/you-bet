const { bets, users, messages } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/bets/';

module.exports = function (app) {
  app.get(rootURL, async (req, res) => {
    try {
      const results = await bets.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: users, as: 'main_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
        ],
      });
      res.json(results);
    } catch (err) {
      console.log(err);
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

  app.put(rootURL, authenticateToken, async (req, res) => {
    try {
      bets.update({
        acceptedUserId: req.user.id,
      }, {
        where: { 
          id: req.body.betId,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
