module.exports = function (sequelize, DataTypes) {
  var Participant = sequelize.define("Participant", {
    wager_in_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Participant.associate = function (models) {
    Participant.belongsTo(models.User);
    Participant.belongsTo(models.Room);
  };

  return Participant;
};
