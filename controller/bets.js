const { bets, messages, Sequelize } = require("../models");
const QueryHelpers = require("./queryHelpers");
const { Op } = Sequelize;

module.exports = {
  getBetsByUserId: async (userIds, current = false) => {
    const endDateConstraint = current
      ? {
          endDate: {
            [Op.gte]: new Date(),
          },
        }
      : {};
    const results = await bets.findAll({
      where: {
        mainUserId: userIds,
        ...endDateConstraint,
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
        },
        returning: true,
      }
    );
    const [affectedRows, acceptedBet] = results;

    if (affectedRows === 0)
      throw "Could not accept bet, it's possible the bet is already accepted";
    return acceptedBet[0];
  },
  deleteBet: async (betId) => await bets.destroy({ where: { id: betId } }),
};
