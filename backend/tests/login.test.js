const request = require("supertest");
const app = require("../app");
const db = require("../models");
const { login, containsForbiddenField } = require("./helpers");
const { user, userResponse } = require("./constants");

describe("login", () => {
  const rootURL = "/api/login";
  let auth = {};

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    await db.users.create(user);
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
  test("successfully login", async () => {
    const response = await login(user.username, user.password);
    auth = response.body;
    expect(containsForbiddenField(response.body)).toBeFalsy();
    expect(response.body).toHaveProperty("token", expect.any(String));
    expect(response.body.userData).toMatchObject(userResponse);
    expect(response.statusCode).toBe(200);
  });
  test("It should fail login", async () => {
    const response = await request(app)
      .post(rootURL)
      .send({ username: "test", password: "test321" });
    expect(response.text).toBe("username or password is incorrect");
    expect(response.statusCode).toBe(409);
  });
  test("should successfully authenticate by token", async () => {
    const response = await request(app)
      .get(`${rootURL}/token`)
      .set("authorization-jwt", `jwt ${auth.token}`);
    expect(containsForbiddenField(response.body)).toBeFalsy();
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      username: user.username,
      name: user.name,
      notifyOnAccept: true,
      notifyOnMessage: true,
      notifyOnFollow: true,
      hasNotificationToken: false,
    });
    expect(response.statusCode).toBe(200);
  });
});
