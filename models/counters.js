module.exports = function (sequelize, DataTypes) {
  var counters = sequelize.define("counters", {
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

  counters.associate = function (models) {
    counters.belongsTo(models.users);
    counters.belongsTo(models.bets);
  };

  return counters;
};
