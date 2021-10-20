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
        const loggedIn = await users.findOne({
          where: {
            username,
            password: hashedPassword
          }
        });
        if (!loggedIn) return res.sendStatus(409);
        const token = generateAccessToken(loggedIn.id);
        await users.update({ token }, {
          where: {
            username: loggedIn.username,
          },
        });
        res.json(token);
      } catch (err) {
        res.json(err);
        console.log(err)
      }
    }
  });

  app.get(`${rootURL}token/`, authenticateToken, async (req, res) => {
    try {
      const userInfo = await users.findOne({
        where: {
          id: req.user.id,
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
    try {
    await users.update({ token: null }, {
      where: {
        id: req.user.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
  });
};
