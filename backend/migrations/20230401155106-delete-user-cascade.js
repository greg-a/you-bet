"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeConstraint("bets", "bets_mainUserId_fkey");
    await queryInterface.addConstraint("bets", {
      fields: ["mainUserId"],
      type: "foreign key",
      name: "bets_mainUserId_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.removeConstraint("messages", "messages_userId_fkey");
    await queryInterface.addConstraint("messages", {
      fields: ["userId"],
      type: "foreign key",
      name: "messages_userId_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.removeConstraint(
      "followers",
      "followers_mainUserId_fkey"
    );
    await queryInterface.addConstraint("followers", {
      fields: ["mainUserId"],
      type: "foreign key",
      name: "followers_mainUserId_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.removeConstraint(
      "followers",
      "followers_followedUserId_fkey"
    );
    await queryInterface.addConstraint("followers", {
      fields: ["followedUserId"],
      type: "foreign key",
      name: "followers_followedUserId_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("bets", "bets_mainUserId_fkey");
    await queryInterface.addConstraint("bets", {
      fields: ["mainUserId"],
      type: "foreign key",
      name: "bets_mainUserId_fkey",
      references: {
        table: "users",
        field: "id",
      },
    });
    await queryInterface.removeConstraint("messages", "messages_userId_fkey");
    await queryInterface.addConstraint("messages", {
      fields: ["userId"],
      type: "foreign key",
      name: "messages_userId_fkey",
      references: {
        table: "users",
        field: "id",
      },
    });
    await queryInterface.removeConstraint(
      "followers",
      "followers_mainUserId_fkey"
    );
    await queryInterface.addConstraint("followers", {
      fields: ["mainUserId"],
      type: "foreign key",
      name: "followers_mainUserId_fkey",
      references: {
        table: "users",
        field: "id",
      },
    });
    await queryInterface.removeConstraint(
      "followers",
      "followers_followedUserId_fkey"
    );
    await queryInterface.addConstraint("followers", {
      fields: ["followedUserId"],
      type: "foreign key",
      name: "followers_followedUserId_fkey",
      references: {
        table: "users",
        field: "id",
      },
    });
  },
};
