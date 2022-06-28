const { createHmac } = require("crypto");
const { users, Sequelize } = require("../models");
const QueryHelpers = require("./queryHelpers");
const { Op } = Sequelize;

const secret = process.env.TOKEN_SECRET;

module.exports = {
  getUser: async (userId, attributes) => {
    const results = await users.findOne({
      where: {
        id: userId,
      },
      attributes: attributes ?? QueryHelpers.attributes.user,
    });
    return results;
  },
  getUserByUsername: async (username) => {
    const results = await users.findOne({
      where: {
        username,
      },
      attributes: QueryHelpers.attributes.user,
    });
    return results;
  },
  getAllUsers: async () => {
    const results = await users.findAll({
      attributes: QueryHelpers.attributes.user,
    });
    return results;
  },
  userSearch: async (input) => {
    const results = await users.findAll({
      attributes: QueryHelpers.attributes.user,
      where: {
        [Op.or]: [
          {
            username: { [Op.iLike]: `%${input.replace(" ", "_")}%` },
          },
          { name: { [Op.iLike]: `%${input}%` } },
        ],
      },
    });
    return results;
  },
  createUser: async (user) => {
    const usernameRegex = /[\W]+/g;
    const invalidUsernameChars = user.username.match(usernameRegex) ?? [];
    if (invalidUsernameChars.length > 0) {
      const error = new Error(
        `These characters are not allowed in your username: ${invalidUsernameChars}`
      );
      error.code = 400;
      throw error;
    }
    const password = createHmac("sha256", secret)
      .update(user.password)
      .digest("hex");
    await users.create({
      ...user,
      password,
    });
  },
  updateUserInfo: async (userId, userInfo) => {
    const results = await users.update(
      {
        ...userInfo,
      },
      {
        where: {
          id: userId,
        },
        returning: true,
      }
    );
    const [affectedRows, updatedUserInfo] = results;
    if (affectedRows === 0) throw new Error();
    return {
      name: updatedUserInfo[0].dataValues.name,
      notifyOnAccept: updatedUserInfo[0].dataValues.notifyOnAccept,
      notifyOnMessage: updatedUserInfo[0].dataValues.notifyOnMessage,
      notifyOnFollow: updatedUserInfo[0].dataValues.notifyOnFollow,
    };
  },
  deleteNotificationToken: async (notification_token) => {
    await users.update(
      {
        notification_token: null,
      },
      {
        where: {
          notification_token,
        },
      }
    );
  },
};
