"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "first_name", "name");
    await queryInterface.renameColumn("users", "token", "notification_token");
    await queryInterface.addColumn("followers", "notificationsOn", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn("users", "notifyOnAccept", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn("users", "notifyOnMessage", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn("users", "notifyOnFollow", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
    await queryInterface.removeColumn("users", "last_name");
    await queryInterface.removeColumn("followers", "userId");
    await queryInterface.removeColumn("bets", "parent_id");
    await queryInterface.removeColumn("bets", "userId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "name", "first_name");
    await queryInterface.renameColumn("users", "notification_token", "token");
    await queryInterface.addColumn("users", "last_name", Sequelize.STRING);
    await queryInterface.addColumn("followers", "userId", Sequelize.INTEGER);
    await queryInterface.addColumn("bets", "parent_id", Sequelize.INTEGER);
    await queryInterface.addColumn("bets", "userId", Sequelize.INTEGER);
    await queryInterface.removeColumn("followers", "notificationsOn");
    await queryInterface.removeColumn("users", "notifyOnAccept");
    await queryInterface.removeColumn("users", "notifyOnMessage");
    await queryInterface.removeColumn("users", "notifyOnFollow");
  },
};
