module.exports = (sequelize, DataTypes) => {
  const bets = sequelize.define("bets", {
    betAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
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
