const request = require("supertest");
const app = require("../app");
const db = require("../models");
const { login } = require("./helpers");
const { user } = require("./constants");

let auth = {};

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  await db.users.create(user);
});

afterAll(async () => {
  db.sequelize.close();
});

describe("login", () => {
  test("successfully login", async () => {
    const response = await login(user.username, user.password);
    console.log({ response });
    auth = response.body;
    // TODO: make sure it is returning the proper fields
    expect(response.statusCode).toBe(200);
  });
  test("It should fail login", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ username: "test", password: "test123" });
    expect(response.statusCode).toBe(409);
  });
  test("should successfully authenticate by token", async () => {
    console.log({ auth });
    const response = await request(app)
      .get("/api/login/token")
      .set("authorization-jwt", `jwt ${auth.token}`);
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
