const { bets, users, messages, counters } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/bets/';

module.exports = (app) => {
  app.get(rootURL, async (req, res) => {
    try {
      const results = await bets.findAll({
        where: {
          parent_id: null,
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: users, as: 'main_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
          { model: messages, include: [{ model: users }] },
          { model: bets, as: 'counter_bets', include: [{ model: users, as: 'main_user' }, { model: messages }] },
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
        parent_id: req.body.betId || null,
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.put(`${rootURL}accept/:id`, authenticateToken, async (req, res) => {
    try {
      bets.update({
        acceptedUserId: req.user.id,
      }, {
        where: {
          id: req.params.id,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.put(`${rootURL}:id`, authenticateToken, async (req, res) => {
    try {
      bets.update({
        description: req.body.description,
        bet_amount: req.body.betAmount,
        end_date: req.body.endDate,
      },
        {
          where: {
            id: req.params.id,
          },
        });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
