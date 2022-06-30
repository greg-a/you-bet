const Messages = require("../controller/messages");
const Bets = require("../controller/bets");
const { authenticateToken } = require("../utils/token");
const { sendError } = require("./utils");
const QueryHelpers = require("../controller/queryHelpers");
const {
  generatePushNotifications,
} = require("../controller/pushNotifications");

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

      // send push notification
      const bet = await Bets.getBet(
        req.body.betId,
        QueryHelpers.attributes.userWithNotificationToken
      );
      if (bet.main_user.notifyOnMessage && bet.main_user.id !== req.user.id)
        generatePushNotifications([bet.main_user.notification_token], {
          title: "New Message",
          subtitle: `@${req.user.username}`,
          body: req.body.message,
          data: bet,
        });
    } catch (error) {
      sendError(error, res);
    }

    // if (newMessage.id) {
    //   const bet = await Bets.getBet(
    //     req.body.betId,
    //     QueryHelpers.attributes.userWithNotificationToken
    //   );
    //   if (bet.main_user.notifyOnMessage && bet.main_user.id !== req.user.id)
    //     generatePushNotifications([bet.main_user.notification_token], {
    //       title: "New Message",
    //       subtitle: `@${req.user.username}`,
    //       body: req.body.message,
    //       data: bet,
    //     });
    // }
  });
};
