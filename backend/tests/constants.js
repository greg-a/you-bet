exports.user = {
  username: "test",
  name: "test",
  password: "test",
  email: "test@gmail.com",
};

exports.user2 = {
  username: "test2",
  name: "test2",
  password: "test2",
  email: "test2@gmail.com",
};

exports.userResponse = {
  id: 1,
  username: this.user.username,
  name: this.user.name,
  notifyOnAccept: true,
  notifyOnMessage: true,
  notifyOnFollow: true,
};

exports.betResponse = {
  id: expect.any(Number),
  ...this.bet,
  main_user: this.userResponse,
  messages: [],
  acceptedUserId: null,
};

exports.bet = {
  description: "this is a bet",
  betAmount: 500,
  endDate: "4/20/24",
  mainUserId: 1,
};

exports.expiredBet = {
  description: "this is an expired bet",
  betAmount: 50,
  endDate: "4/20/20",
  mainUserId: 1,
};

exports.forbiddenFields = ["password", "notification_token", "email"];
