const { usernameRegex } = require("../utils/utils");
const { generateHashedPassword } = require("../utils/token");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "username cannot be empty",
        },
        validateUsername: function (username) {
          const invalidUsernameChars =
            username
              .match(usernameRegex)
              ?.map((char) => (char === " " ? "[space]" : char)) ?? [];
          if (invalidUsernameChars.length > 0) {
            const error = new Error(
              `These characters are not allowed in your username: ${invalidUsernameChars}`
            );
            error.code = 400;
            throw error;
          }
        },
      },
      set(username) {
        this.setDataValue("username", username.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", generateHashedPassword(value));
      },
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "email is invalid",
        },
      },
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name cannot be empty",
        },
      },
    },
    notification_token: {
      type: DataTypes.STRING(80),
    },
    notifyOnAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notifyOnMessage: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notifyOnFollow: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  users.associate = (models) => {
    users.hasMany(models.bets, { foreignKey: "mainUserId" });
    users.hasMany(models.bets, { foreignKey: "acceptedUserId" });
    users.hasMany(models.messages);
    users.hasMany(models.followers, { foreignKey: "mainUserId" });
    users.hasMany(models.followers, { foreignKey: "followedUserId" });
  };

  return users;
};
