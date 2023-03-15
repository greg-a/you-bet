module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define("messages", {
    message: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "message cannot be empty",
        },
      },
    },
  });

  messages.associate = (models) => {
    messages.belongsTo(models.users);
    messages.belongsTo(models.bets, { onDelete: "cascade" });
  };

  return messages;
};
