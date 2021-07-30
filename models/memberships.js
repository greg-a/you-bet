module.exports = function (sequelize, DataTypes) {
  var memberships = sequelize.define("memberships", {
    wager_in_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  memberships.associate = function (models) {
    memberships.belongsTo(models.users);
    memberships.belongsTo(models.rooms);
  };

  return memberships;
};
