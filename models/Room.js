module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    odds: {
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });

  Room.associate = (models) => {
    Room.hasMany(models.Participant, {
      as: "participants"
    });

    Room.hasMany(models.Message, {
      as: "messages"
    })
  };

  return Room;
};
