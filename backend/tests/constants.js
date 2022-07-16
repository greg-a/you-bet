exports.user = {
  username: "test",
  name: "test",
  password: "test",
  email: "test@gmail.com",
};

exports.userResponse = {
  id: 1,
  username: this.user.username,
  name: this.user.name,
  notifyOnAccept: true,
  notifyOnMessage: true,
  notifyOnFollow: true,
};

exports.bet = {
  description: "this is a bet",
  betAmount: 500,
  endDate: "4/20/24",
  mainUserId: 1,
};

exports.forbiddenFields = ["password", "notification_token", "email"];
