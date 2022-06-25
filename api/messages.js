const Messages = require("../controller/messages");
const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");

const rootURL = "/api/messages/";

module.exports = (app) => {
  app.post(rootURL, authenticateToken, async (req, res) => {
    try {
      const results = await Messages.newMessage(
        req.user.id,
        req.body.betId,
        req.body.message
      );
      res.json(results);
    } catch (error) {
      sendError(error, res);
    }
  });
};
