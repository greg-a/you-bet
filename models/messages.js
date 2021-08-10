module.exports = function (sequelize, DataTypes) {
  var messages = sequelize.define("messages", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  messages.associate = function (models) {
    messages.belongsTo(models.users);

    messages.belongsTo(models.bets);
  };

  return messages;
};
