module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define("messages", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  messages.associate = (models) => {
    messages.belongsTo(models.users);

    messages.belongsTo(models.bets);
  };

  return messages;
};
