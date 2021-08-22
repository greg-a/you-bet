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
    parent_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  bets.associate = (models) => {
    bets.belongsTo(models.users, { as: 'main_user' });
    bets.belongsTo(models.users, { as: 'accepted_user' });
    bets.belongsTo(models.bets, { as: 'parent_bet', foreignKey: 'parent_id' });
    bets.hasMany(models.messages);
    bets.hasMany(models.bets, { as: 'counter_bets', foreignKey: 'parent_id' });
  };

  return bets;
};
