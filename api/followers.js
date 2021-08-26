const { followers } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/followers/';

module.exports = (app) => {
  app.get(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await followers.findAll({
        where: {
          mainUserId: req.user.id,
        },
      });
      console.log('FOLLOWING LIST', results);
      res.json(results);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await followers.create({
        mainUserId: req.user.id,
        followedUserId: req.body.id,
      });
      console.log('FOLLOWING', results);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.delete(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await followers.destroy({
        where: {
          mainUserId: req.user.id,
          followedUserId: req.body.id,
        },
      });
      console.log('UNFOLLOW', results);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
};
