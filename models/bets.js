module.exports = (sequelize, DataTypes) => {
  const bets = sequelize.define("bets", {
    bet_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
    },
  });

  bets.associate = function (models) {
    bets.belongsTo(models.users, { as: 'main_user' });
    bets.belongsTo(models.users, { as: 'accepted_user' });
  };

  return bets;
};
