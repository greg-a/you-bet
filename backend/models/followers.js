module.exports = (sequelize, DataTypes) => {
  const followers = sequelize.define("followers", {
    notificationsOn: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  followers.associate = (models) => {
    followers.belongsTo(models.users, { as: "main_user" });
    followers.belongsTo(models.users, {
      as: "followed_user",
    });
  };

  return followers;
};
