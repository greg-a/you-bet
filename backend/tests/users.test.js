const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../app");
const db = require("../models");
const { login, containsForbiddenField } = require("./helpers");
const { user, userResponse } = require("./constants");

let auth = {};

beforeAll(async () => {
  try {
    await db.sequelize.sync({ force: true });
    await db.users.create(user);
    const loginResponse = await login(user.username, user.password);
    auth = loginResponse.body;
  } catch (err) {
    console.log({ err });
  }
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Create new user", () => {
  test("It should successfully create a user", async () => {
    try {
      const newUser = await request(app)
        .post("/api/users")
        .send({
          username: `${faker.name.firstName()}_${faker.name.lastName()}`,
          name: faker.name.findName(),
          password: faker.internet.password(10),
          email: faker.internet.email(),
        });
      expect(newUser.statusCode).toBe(200);
    } catch (err) {
      console.log({ err });
    }
  });
  test("Username with spaces should fail", async () => {
    const newUser = await request(app)
      .post("/api/users")
      .send({
        username: "test user",
        name: faker.name.findName(),
        password: faker.internet.password(10),
        email: faker.internet.email(),
      });
    expect(newUser.statusCode).toBe(400);
  });
});

describe("get all users", () => {
  test("fails without jwt", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(412);
  });
  test("It should respond with an array of users", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("authorization-jwt", `jwt ${auth.token}`);
    expect(response.body.length).toBe(2);
    expect(containsForbiddenField(response.body[0])).toBeFalsy();
    expect(response.body[0]).toMatchObject(userResponse);
    expect(response.statusCode).toBe(200);
  });
});
