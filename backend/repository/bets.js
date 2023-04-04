const { bets, messages, Sequelize } = require("../models");
const QueryHelpers = require("../repository/queryHelpers");
const { Op } = Sequelize;

module.exports = {
  getMainBetFeed: async (userIds) => {
    const conditions = {
      endDate: {
        [Op.gte]: new Date(),
      },
      acceptedUserId: null,
    };
    const results = await bets.findAll({
      where: {
        mainUserId: userIds,
        ...conditions,
      },
      order: [
        ["createdAt", "DESC"],
        [messages, "createdAt", "DESC"],
      ],
      include: [
        QueryHelpers.includes.mainUser(),
        QueryHelpers.includes.messages(),
        QueryHelpers.includes.acceptedUser(),
      ],
    });
    return results;
  },
  getAllBetsByUserId: async (userId) => {
    const results = await bets.findAll({
      where: {
        [Op.or]: [{ mainUserId: userId }, { acceptedUserId: userId }],
      },
      order: [
        ["createdAt", "DESC"],
        [messages, "createdAt", "DESC"],
      ],
      include: [
        QueryHelpers.includes.mainUser(),
        QueryHelpers.includes.messages(),
        QueryHelpers.includes.acceptedUser(),
      ],
    });
    return results;
  },
  getBet: async (betId, userAttributes) => {
    const response = await bets.findOne({
      where: {
        id: betId,
      },
      include: [
        QueryHelpers.includes.mainUser(userAttributes),
        QueryHelpers.includes.messages(),
        QueryHelpers.includes.acceptedUser(),
      ],
      order: [[messages, "createdAt", "DESC"]],
    });
    return response;
  },
  createBet: async (data) => await bets.create(data, { returning: true }),
  acceptBet: async (userId, betId) => {
    const results = await bets.update(
      {
        acceptedUserId: userId,
      },
      {
        where: {
          id: betId,
          acceptedUserId: null,
          endDate: {
            [Op.gte]: new Date(),
          },
          mainUserId: {
            [Op.not]: userId,
          },
        },
        returning: true,
      }
    );
    const [affectedRows, acceptedBet] = results;

    if (affectedRows === 0)
      throw "Could not accept bet, chances are the bet was already accepted, expired, or you somehow tried to accept your own bet";
    return acceptedBet[0];
  },
  deleteBet: async (betId) => await bets.destroy({ where: { id: betId } }),
};
