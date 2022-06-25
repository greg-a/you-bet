module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    notification_token: {
      type: DataTypes.STRING,
    },
    notifyOnAccept: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notifyOnMessage: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notifyOnFollow: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  users.associate = (models) => {
    users.hasMany(models.bets, { foreignKey: "mainUserId" });
    users.hasMany(models.bets, { foreignKey: "acceptedUserId" });
    users.hasMany(models.messages);
    users.hasMany(models.followers, { foreignKey: "mainUserId" });
    users.hasMany(models.followers, { foreignKey: "followedUserId" });
  };

  return users;
};
