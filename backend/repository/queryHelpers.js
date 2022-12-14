const { users, messages } = require("../models");

const attr = {
  user: { exclude: ["password", "email", "notification_token"] },
  userWithNotificationToken: { exclude: ["password", "email"] },
  myNotifications: [
    "notification_token",
    "notifyOnAccept",
    "notifyOnMessage",
    "notifyOnFollow",
  ],
};

module.exports = {
  attributes: attr,
  includes: {
    mainUser: (attributes = attr.user) => ({
      model: users,
      as: "main_user",
      attributes,
    }),
    messages: (userAttributes = attr.user) => ({
      model: messages,
      include: [{ model: users, attributes: userAttributes }],
    }),
    acceptedUser: (attributes = attr.user) => ({
      model: users,
      as: "accepted_user",
      attributes,
    }),
    followedUser: (attributes = attr.user) => ({
      model: users,
      as: "followed_user",
      attributes,
    }),
  },
};
