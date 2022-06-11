const { bets, users, messages, followers } = require("../models");

const attributes = {
  user: ["id", "first_name", "last_name", "username"],
};

module.exports = {
  attributes,
  includes: {
    mainUser: {
      model: users,
      as: "main_user",
      attributes: attributes.user,
    },
    messages: {
      model: messages,
      include: [{ model: users }],
    },
    bets: {
      model: bets,
      as: "counter_bets",
      include: [{ model: users, as: "main_user" }, { model: messages }],
    },
    acceptedUser: {
      model: users,
      as: "accepted_user",
      attributes: attributes.user,
    },
    followedUser: {
      model: users,
      as: "followed_user",
      attributes: attributes.user,
    },
    counterBets: {
      model: bets,
      as: "counter_bets",
      include: [{ model: users, as: "main_user" }, { model: messages }],
    },
  },
};
