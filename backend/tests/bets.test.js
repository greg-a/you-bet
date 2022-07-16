const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../app");
const db = require("../models");
const { login } = require("./helpers");
const { bet, user } = require("./constants");

let auth = {};

beforeAll(async () => {
  try {
    await db.sequelize.sync({ force: true });
    await db.users.create(user);
    await db.bets.create(bet);
    const loginResponse = await login(user.username, user.password);
    auth = loginResponse.body;
  } catch (err) {
    console.log({ err });
  }
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Create new bet", () => {
  const newBet = {
    description: faker.lorem.paragraph().slice(0, 250),
    betAmount: faker.datatype.number(),
    endDate: faker.date.future(50).toISOString(),
  };
  test("It should fail without a jwt", async () => {
    const response = await request(app).post("/api/bets").send(newBet);
    expect(response.text).toBe("jwt must be provided");
    expect(response.statusCode).toBe(412);
  });
  test("It should successfully create a bet", async () => {
    const response = await request(app)
      .post("/api/bets")
      .send(newBet)
      .set("authorization-jwt", `jwt ${auth.token}`);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      mainUserId: auth.userData.id,
      ...newBet,
    });
    expect(response.statusCode).toBe(200);
  });
});
