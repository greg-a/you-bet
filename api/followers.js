const { followers, users } = require('../models');
const { Sequelize } = require('../models');
const { authenticateToken } = require('../utils/token');
const Op = Sequelize.Op;

const rootURL = '/api/followers/';

module.exports = (app) => {
  app.get(rootURL, authenticateToken, async (req, res) => {
    try {
      const followingList = await followers.findAll({
        where: {
          mainUserId: req.user.id,
        },
        attributes: ['followedUserId'],
        include: [
          { model: users, as: 'followed_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
        ],
      });
      const followerList = await followers.findAll({
        where: {
          followedUserId: req.user.id,
        },
        attributes: ['mainUserId'],
        include: [
          { model: users, as: 'main_user', attributes: ['id', 'first_name', 'last_name', 'username'] },
        ],
      });
      res.json({ followingList, followerList });
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

  app.delete(`${rootURL}:id`, authenticateToken, async (req, res) => {
    try {
      const results = await followers.destroy({
        where: {
          mainUserId: req.user.id,
          followedUserId: req.params.id,
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
