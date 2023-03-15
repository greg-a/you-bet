const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../app");
const db = require("../models");
const { login } = require("./helpers");
const { bet, expiredBet, user, user2 } = require("./constants");

describe("Messages endpoint", () => {
  const rootURL = "/api/messages";
  let auth = {};

  beforeAll(async () => {
    try {
      await db.sequelize.sync({ force: true });
      await db.users.bulkCreate([user, user2]);
      await db.bets.bulkCreate([bet, expiredBet]);
      const loginResponse = await login(user.username, user.password);
      auth = loginResponse.body;
    } catch (err) {
      console.log({ err });
    }
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
  const newMessage = {
    message: faker.lorem.paragraph().slice(0, 80),
    betId: 1,
  };
  test("It should fail without a jwt", async () => {
    const response = await request(app).post(rootURL).send(newMessage);
    expect(response.text).toBe("jwt must be provided");
    expect(response.statusCode).toBe(412);
  });
  test("It should successfully create a message", async () => {
    const response = await request(app)
      .post(rootURL)
      .send(newMessage)
      .set("authorization-jwt", `jwt ${auth.token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      userId: auth.userData.id,
      createdAt: expect.any(String),
      ...newMessage,
    });
  });
  test("Message should be included in bet response", async () => {
    const response = await request(app)
      .get(`/api/bets/${newMessage.betId}`)
      .set("authorization-jwt", `jwt ${auth.token}`);
    expect(response.body.messages[0]).toMatchObject({
      ...newMessage,
      id: expect.any(Number),
      createdAt: expect.any(String),
      userId: auth.userData.id,
    });
    expect(response.statusCode).toBe(200);
  });
});
