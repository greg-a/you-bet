const Bets = require("../controller/bets");
const Followers = require("../controller/followers");
const Users = require("../controller/users");
const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");

const rootURL = "/api/bets/";

module.exports = (app) => {
  app.get(rootURL, authenticateToken, async (req, res) => {
    try {
      const followList = await Followers.getFollowerIds(req.user.id);
      const results = await Bets.getBetsByUserId(
        [...followList, req.user.id],
        true
      );
      res.json(results);
    } catch (error) {
      console.log({ error });
      sendError(error, res);
    }
  });

  app.get(`${rootURL}profile/:userId?`, authenticateToken, async (req, res) => {
    try {
      const profileId = Number(req.params?.userId) || req.user.id;
      const results = await Bets.getBetsByUserId(profileId);
      res.json(results);
    } catch (error) {
      sendError(error, res);
    }
  });

  app.get(`${rootURL}:username/bet/:betId`, async (req, res) => {
    try {
      const response = await Users.getUserByUsername(req.params.username);
      const results = await Bets.getBet(req.params.betId);
      if (results.dataValues.mainUserId !== response.dataValues.id)
        throw new Error();
      res.json(results);
    } catch (err) {
      sendError(err, res);
    }
  });

  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await Bets.createBet({
        mainUserId: req.user.id,
        ...req.body,
      });
      res.json(results);
    } catch (error) {
      sendError(error, res);
    }
  });

  app.put(`${rootURL}accept/:id`, authenticateToken, async (req, res) => {
    try {
      const results = await Bets.acceptBet(req.user.id, req.params.id);
      res.json(results);
    } catch (error) {
      sendError(error, res);
    }
  });

  app.get(`${rootURL}:betId`, async (req, res) => {
    try {
      const response = await Bets.getBet(req.params.betId);
      if (!response) return res.status(404).send("Bet not found");
      res.json(response);
    } catch (error) {
      sendError(error, res);
    }
  });

  app.delete(`${rootURL}delete/:betId`, authenticateToken, async (req, res) => {
    try {
      await Bets.deleteBet(req.params.betId);
      res.sendStatus(200);
    } catch (error) {
      sendError(error, res);
    }
  });
};
