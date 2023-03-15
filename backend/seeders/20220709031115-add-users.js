"use strict";

const { generateUsers } = require("../utils/mockData/generators");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        // {
        //   username: "test",
        //   password: "test",
        //   name: "test",
        //   email: "test@gmail.com",
        // },
        ...generateUsers(100),
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("users", { id: { [Op.gt]: 0 } }, {});
  },
};
