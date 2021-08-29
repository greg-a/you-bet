module.exports = (sequelize) => {
  const followers = sequelize.define('followers');

  followers.associate = (models) => {
    followers.belongsTo(models.users, { as: 'main_user' });
    followers.belongsTo(models.users, { as: 'followed_user' });
  };

  return followers;
};
