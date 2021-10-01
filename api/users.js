const { createHmac } = require('crypto');
const dotenv = require('dotenv');
const { users, bets, messages } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/users/';
const secret = process.env.TOKEN_SECRET;
const attributes = ['id', 'first_name', 'last_name', 'username'];

module.exports = function (app) {
  app.get(rootURL, async (req, res) => {
    const results = await users.findAll({
      attributes,
    });
    res.json(results);
  });

  app.get(`${rootURL}:id`, async (req, res) => {
    const results = await users.findAll({
      attributes,
      where: {
        id: req.params.id,
      },
    });
    res.json(results);
  });

  app.get(`${rootURL}search/:input`, authenticateToken, async (req, res) => {
    const results = await users.findAll({
      attributes,
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${req.params.input}%` } },
          { first_name: req.params.input },
          { last_name: req.params.input },
        ],
      },
    });
    res.json(results);
  });

  app.post(rootURL, async (req, res) => {
    const paramsClone = { ...req.body };
    paramsClone.password = createHmac('sha256', secret)
      .update(req.body.password)
      .digest('hex');
    try {
      const createUser = await users.create(paramsClone);
      res.send(createUser);
      console.log({createUser})
    } catch (err) {
      res.send(err);
    }
  });

  app.get(`${rootURL}profile/:username`, authenticateToken, async (req, res) => {
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
          ]
        },
        order: [['createdAt', 'DESC']],
        include: [
          { model: users, as: 'main_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
          { model: messages, include: [{ model: users }] },
          { model: bets, as: 'counter_bets', include: [{ model: users, as: 'main_user' }, { model: messages }] },
          { model: users, as: 'accepted_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
        ],
      });
      res.json({ bets: results, profileInfo: profile });
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
