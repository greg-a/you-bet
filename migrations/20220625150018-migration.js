"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn("bets", "bet_amount", "betAmount");
    await queryInterface.renameColumn("bets", "end_date", "endDate");
  },

  async down(queryInterface) {
    await queryInterface.renameColumn("bets", "betAmount", "bet_amount");
    await queryInterface.renameColumn("bets", "endDate", "end_date");
  },
};
