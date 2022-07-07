module.exports = (sequelize, DataTypes) => {
  const bets = sequelize.define("bets", {
    betAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 100000,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "description cannot be empty",
        },
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  });

  bets.associate = (models) => {
    bets.belongsTo(models.users, { as: "main_user" });
    bets.belongsTo(models.users, {
      as: "accepted_user",
    });
    bets.hasMany(models.messages, { onDelete: "cascade" });
  };

  return bets;
};
