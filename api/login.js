const { createHmac } = require('crypto');
const dotenv = require('dotenv');
const { users } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken, generateAccessToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/login/';
const secret = process.env.TOKEN_SECRET;

module.exports = function (app) {
  app.post(rootURL, async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const hashedPassword = createHmac('sha256', secret)
          .update(password)
          .digest('hex');
        await users.findAll({
          where: {
            username,
            password: hashedPassword
          }
        });
        const token = generateAccessToken(username);
        console.log(token)
        await users.update({ token }, {
          where: {
            username,
          },
        });
        res.json(token);
      } catch (err) {
        res.json(err);
        console.log(err)
      }
    }
  });

  app.get(`${rootURL}token`, authenticateToken, async (req, res) => {
    try {
      const userInfo = await users.findOne({
        where: {
          username: req.user.username,
        },
      });
      if (userInfo.token === req.token) {
        res.json(userInfo);
      } else {
        res.sendStatus(403);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get('/api/logout', authenticateToken, async (req, res) => {
    await users.update({ token: null }, {
      where: {
        username: req.user.username,
      },
    });
    res.redirect('/login');
  });
};
