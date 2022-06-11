const { followers, users } = require("../models");
const { Sequelize } = require("../models");
const { authenticateToken } = require("../utils/token");
const Op = Sequelize.Op;

const rootURL = "/api/followers/";

module.exports = (app) => {
  app.get(rootURL, authenticateToken, async (req, res) => {
    try {
      const followingList = await followers.findAll({
        where: {
          mainUserId: req.user.id,
        },
        attributes: ["followedUserId"],
        include: [
          {
            model: users,
            as: "followed_user",
            attributes: ["id", "first_name", "last_name", "username"],
          },
        ],
      });
      const followerList = await followers.findAll({
        where: {
          followedUserId: req.user.id,
        },
        attributes: ["mainUserId"],
        include: [
          {
            model: users,
            as: "main_user",
            attributes: ["id", "first_name", "last_name", "username"],
          },
        ],
      });
      res.json({ followingList, followerList });
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      if (!req.body.userId) throw "Error finding user";
      const results = await followers.create({
        mainUserId: req.user.id,
        followedUserId: req.body.userId,
      });
      const followedUser = await users.findOne({
        where: {
          id: results.dataValues.followedUserId,
        },
        attributes: ["id", "first_name", "last_name", "username"],
      });

      res.json(followedUser);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.delete(`${rootURL}:userId`, authenticateToken, async (req, res) => {
    try {
      if (!req.params.userId) throw "Error finding user";
      await followers.destroy({
        where: {
          mainUserId: req.user.id,
          followedUserId: req.params.userId,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
};
