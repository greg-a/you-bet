const request = require("supertest");
const app = require("../app");
const { forbiddenFields } = require("./constants");

exports.login = async (username, password) => {
  const response = await request(app)
    .post("/api/login")
    .send({ username, password });
  return response;
};

exports.containsForbiddenField = (object) => {
  return Object.keys(object).some((val) => forbiddenFields.includes(val));
};
