const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");
const Followers = require("../controller/followers");

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
    try {
      const results = await Followers.newFollower(
        req.user.id,
        req.params.userId
      );
      res.json(results);
    } catch (error) {
      sendError(error, res);
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
      console.log({ err });
      sendError(err, res);
    }
  });

  app.delete(`${rootURL}:userId`, authenticateToken, async (req, res) => {
    try {
      await Followers.unFollowUser(req.user.id, req.params.userId);
      res.sendStatus(200);
    } catch (error) {
      console.log({ error });
      sendError(error, res);
    }
  });
};
