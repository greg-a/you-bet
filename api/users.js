const { createHmac } = require('crypto');
const dotenv = require('dotenv');
const db = require('../models');
const { users, bets, messages } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/users/';
const secret = process.env.TOKEN_SECRET;

module.exports = function (app) {
  app.get(rootURL, async function (req, res) {
    const results = await users.findAll();
    res.json(results);
  });

  app.get(`${rootURL}:id`, async (req, res) => {
    const results = await users.findAll({
      where: {
        id: req.params.id
      }
    });
    res.json(results);
  });

  app.post(rootURL, async (req, res) => {
    const paramsClone = { ...req.body };
    paramsClone.password = createHmac('sha256', secret)
      .update(req.body.password)
      .digest('hex');
    try {
      const createUser = await db.users.create(paramsClone);
      res.send(createUser);
    } catch (err) {
      res.send(err);
    }
  });

  app.get(`${rootURL}profile/:username`, authenticateToken, async (req, res) => {
    let profileId = null;
    console.log('USERNAME', req.params.username)
    try {
      const response = await users.findOne({
        where: {
          username: req.params.username,
        },
      });
      profileId = response.id;
    } catch (err) {
      res.sendStatus(500);
    }

    try {
      const results = await bets.findAll({
        where: {
          parent_id: null,
          mainUserId: profileId,
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: users, as: 'main_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
          { model: messages },
          { model: bets, as: 'counter_bets' },
        ],
      });
      res.json(results);
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
