const request = require("supertest");
const app = require("../app");

exports.login = async (username, password) => {
  const response = await request(app)
    .post("/api/login")
    .send({ username, password });
  return response;
};
