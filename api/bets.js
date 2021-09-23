const { bets, users, messages, counters, followers } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/bets/';

module.exports = (app) => {
  app.get(rootURL, authenticateToken, async (req, res) => {
    let followList = [req.user.id];
    try {
      const results = await followers.findAll({
        where: {
          mainUserId: req.user.id,
        },
      });
      followList = [...followList, ...results.map(({ followedUserId }) => followedUserId)];
    } catch (err) {
      console.log(err);
    }

    try {
      const results = await bets.findAll({
        where: {
          parent_id: null,
          mainUserId: followList,
          end_date: {
            [Op.gte]: new Date(),
          },
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: users, as: 'main_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
          { model: messages, include: [{ model: users }] },
          { model: bets, as: 'counter_bets', include: [{ model: users, as: 'main_user' }, { model: messages }] },
          { model: users, as: 'accepted_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
        ],
      });
      res.json(results);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get(`${rootURL}history/:userId`, authenticateToken, async (req, res) => {
    try {
      const results = await bets.findAll({
        where: {
          parent_id: null,
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
      await bets.update({
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

  app.get(`${rootURL}:username/bet/:betId`, async (req, res) => {
    let userId;
    if (req.params.username) {
      try {
        const response = await users.findOne({
          where: {
            username: req.params.username
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
        order: [[messages, 'createdAt', 'DESC'], ['counter_bets', 'createdAt', 'DESC']],
        include: [
          { model: users, as: 'main_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
          { model: messages, include: [{ model: users }] },
          { model: bets, as: 'counter_bets', include: [{ model: users, as: 'main_user' }, { model: messages }] },
          { model: users, as: 'accepted_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
        ],
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
          [Op.or]: [
            { id: req.params.betId },
            { parent_id: req.params.betId },
          ]
        },
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      console.log(err)
    }
  });
};
