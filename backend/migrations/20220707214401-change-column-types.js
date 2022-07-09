"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("bets", "endDate", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("messages", "message", {
      type: Sequelize.STRING(80),
    });
    await queryInterface.changeColumn("users", "username", {
      type: Sequelize.STRING(20),
    });
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING(80),
    });
    await queryInterface.changeColumn("users", "name", {
      type: Sequelize.STRING(80),
      allowNull: false,
    });
    await queryInterface.changeColumn("users", "notification_token", {
      type: Sequelize.STRING(80),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("bets", "endDate", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
    await queryInterface.changeColumn("messages", "message", {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("users", "username", {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("users", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "notification_token", {
      type: Sequelize.STRING,
    });
  },
};
