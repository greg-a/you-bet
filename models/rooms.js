module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define("rooms", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  rooms.associate = (models) => {
    rooms.hasMany(models.memberships);

    rooms.hasMany(models.messages);
  };

  return rooms;
};
