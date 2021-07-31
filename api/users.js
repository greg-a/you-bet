const { createHmac } = require('crypto');
const dotenv = require('dotenv');
const db = require('../models');
const { users } = require('../models');
const { Sequelize } = require('../models');
const Op = Sequelize.Op;

const rootURL = '/api/users/';
const secret = process.env.TOKEN_SECRET;

module.exports = function (app) {
  // get all users (eventually query by first name, last name, username)
  app.get(rootURL, async function (req, res) {
    const results = await users.findAll();
    res.json(results);
  });

  // get user by user id
  app.get(`${rootURL}:id`, async function (req, res) {
    const results = await users.findAll({
      where: {
        id: req.params.id
      }
    });
    res.json(results);
  });

  // create new user
  app.post(rootURL, async function (req, res) {
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
};
