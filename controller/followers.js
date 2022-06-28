const { followers } = require("../models");
const QueryHelpers = require("../controller/queryHelpers");
const Users = require("./users");

module.exports = {
  getFollowerIds: async (userId) => {
    const results = await followers.findAll({
      where: {
        mainUserId: userId,
      },
    });
    return results.map(({ followedUserId }) => followedUserId);
  },
  getFollowLists: async (userId) => {
    const followingList = await followers.findAll({
      where: {
        mainUserId: userId,
      },
      attributes: ["followedUserId", "notificationsOn"],
      include: [QueryHelpers.includes.followedUser],
    });
    const followerList = await followers.findAll({
      where: {
        followedUserId: userId,
      },
      attributes: ["mainUserId"],
      include: [QueryHelpers.includes.mainUser],
    });
    return {
      followingList,
      followerList,
    };
  },
  getFollowerNotificationTokens: async (userId) => {
    const notifyUsers = await followers.findAll({
      where: {
        followedUserId: userId,
        notificationsOn: true,
      },
      include: [QueryHelpers.includes.mainUser],
    });
    return notifyUsers.map(({ main_user }) => main_user.notification_token);
  },
  newFollower: async (userId, followUserId) => {
    const follow = await followers.create(
      {
        mainUserId: userId,
        followedUserId: followUserId,
      },
      { returning: true }
    );
    const followed_user = await Users.getUser(follow.dataValues.followedUserId);
    return {
      ...follow.dataValues,
      followed_user,
    };
  },
  unFollowUser: async (mainUserId, followedUserId) => {
    await followers.destroy({ where: { mainUserId, followedUserId } });
  },
  updateNotificationForUser: async (
    userId,
    followedUserId,
    notificationsOn
  ) => {
    const results = await followers.update(
      {
        notificationsOn,
      },
      {
        where: {
          mainUserId: userId,
          followedUserId,
        },
        returning: true,
      }
    );
    const [affectedRows, updatedFollow] = results;
    if (affectedRows === 0) {
      const error = new Error("Could not find user");
      error.code = 404;
      throw error;
    }
    return updatedFollow[0];
  },
};
