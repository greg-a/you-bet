const crypto = require('crypto');
const db = require('../models');
const { users } = require('../models');
const { Sequelize, sequelize } = require('../models');
const Op = Sequelize.Op;

const rootURL = '/api/users/';
const secret = 'abc123' // create secure secret in .env?

module.exports = function (app) {
  app.get(rootURL, async function (req, res) {
    const results = await users.findAll();
    // res.json(results);
    res.send('helooo')
  });

  app.get(`${rootURL}:id`, async function (req, res) {
    const results = await users.findAll({
      where: {
        id: req.params.id
      }
    });
    res.json(results);
  });

  app.post(`${rootURL}login`, async function (req, res) {
    const { username, password } = req.body;

    if (username && password) {
      const hashedPassword = createHmac('sha256', secret)
        .update(password)
        .digest('hex');
      console.log(username, password, hashedPassword)
      // const results = await users.findAll({
      //   where: {
      //     username,
      //     password: hashedPassword
      //   }
      // });
    }
  });

  app.post(rootURL, async function (req, res) {
    const paramsClone = { ...req.body };
    paramsClone.password = createHmac('sha256', secret)
      .update(password)
      .digest('hex');
    try {
      const createUser = await db.users.create(paramsClone);
      res.send(createUser);
    } catch (err) {
      res.send(err);
    }
  });
};
