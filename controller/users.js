const { users, Sequelize } = require("../models");
const {
  generateAccessToken,
  generateHashedPassword,
} = require("../utils/token");
const QueryHelpers = require("./queryHelpers");
const { Op } = Sequelize;

module.exports = {
  getUser: async (userId, attributes) => {
    const results = await users.findOne({
      where: {
        id: userId,
      },
      attributes: attributes ?? QueryHelpers.attributes.user,
      raw: true,
    });
    return results;
  },
  getUserByUsername: async (username) => {
    const results = await users.findOne({
      where: {
        username,
      },
      attributes: QueryHelpers.attributes.user,
      raw: true,
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
    const password = generateHashedPassword(user.password);
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
  login: async (data) => {
    const { username, password } = data;
    const hashedPassword = generateHashedPassword(password);
    const loggedInUser = await users.findOne({
      logging: false,
      where: {
        username: username.toLowerCase(),
        password: hashedPassword,
      },
      attributes: QueryHelpers.attributes.userWithNotificationToken,
    });
    if (!loggedInUser?.dataValues) {
      const error = new Error("username or password is incorrect");
      error.code = 409;
      throw error;
    }
    const { notification_token, ...userData } = loggedInUser.dataValues;
    const token = generateAccessToken(userData);

    return {
      token,
      userData: {
        ...userData,
        hasNotificationToken: !!notification_token,
      },
    };
  },
  logout: async (userId) => {
    await users.update(
      { notification_token: null },
      {
        logging: false,
        where: {
          id: userId,
        },
      }
    );
  },
};
