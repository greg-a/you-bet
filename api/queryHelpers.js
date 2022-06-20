const { users, messages } = require("../models");

const attributes = {
  user: [
    "id",
    "first_name",
    "last_name",
    "username",
//    "name",
//    "notification_token",
//    "notifyOnAccept",
//    "notifyOnMessage",
//    "notifyOnFollow",
  ],
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
  },
};
