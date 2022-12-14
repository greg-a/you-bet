require("dotenv").config();

const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");
const Followers = require("../controller/followers");
const Users = require("../controller/users");
const QueryHelpers = require("./queryHelpers");
const {
  generatePushNotifications,
} = require("../controller/pushNotifications");

const rootURL = "/api/followers/";

module.exports = (app) => {
  app.get(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await Followers.getFollowLists(req.user.id);
      res.json(results);
    } catch (err) {
      sendError(err, res);
    }
  });

  app.post(`${rootURL}:userId`, authenticateToken, async (req, res) => {
    let errorMain = false;
    try {
      if (req.user.id == req.params.userId) {
        const error = new Error("You cannot follow yourself");
        error.code = 400;
        throw error;
      }
      const results = await Followers.newFollower(
        req.user.id,
        req.params.userId
      );
      res.json(results);
    } catch (error) {
      errorMain = true;
      sendError(error, res);
    }

    if (errorMain) return;
    // send push notification
    const followedUser = await Users.getUser(
      req.params.userId,
      QueryHelpers.attributes.userWithNotificationToken
    );
    if (followedUser.notifyOnFollow) {
      generatePushNotifications([followedUser.notification_token], {
        title: `@${req.user.username} followed you`,
        data: req.user,
      });
    }
  });

  app.put(`${rootURL}notifications`, authenticateToken, async (req, res) => {
    try {
      const results = await Followers.updateNotificationForUser(
        req.user.id,
        req.body.followedUserId,
        req.body.notificationsOn
      );
      res.json(results);
    } catch (err) {
      sendError(err, res);
    }
  });

  app.delete(`${rootURL}:userId`, authenticateToken, async (req, res) => {
    try {
      await Followers.unFollowUser(req.user.id, req.params.userId);
      res.sendStatus(200);
    } catch (error) {
      sendError(error, res);
    }
  });
};
