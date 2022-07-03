const { messages } = require("../models");

module.exports = {
  newMessage: async (userId, betId, message) => {
    const results = await messages.create(
      {
        userId,
        betId,
        message,
      },
      {
        returning: true,
      }
    );
    return results;
  },
};
