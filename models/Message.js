module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Message.associate = function (models) {
    Message.belongsTo(models.User);

    Message.belongsTo(models.Room);
  };

  return Message;
};
