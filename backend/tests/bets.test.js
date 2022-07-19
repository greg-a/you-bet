const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../app");
const db = require("../models");
const { login, containsForbiddenField } = require("./helpers");
const { bet, expiredBet, user, betResponse, user2 } = require("./constants");

describe("Bets endpoint", () => {
  const rootURL = "/api/bets";
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
  const newBet = {
    description: faker.lorem.paragraph().slice(0, 250),
    betAmount: faker.datatype.number(),
    endDate: faker.date.future(50).toISOString(),
  };
  test("It should fail without a jwt", async () => {
    const response = await request(app).post(rootURL).send(newBet);
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
  test("It should fail without a jwt", async () => {
    const response = await request(app).get(rootURL);
    expect(response.text).toBe("jwt must be provided");
    expect(response.statusCode).toBe(412);
  });
  test("get all current bets", async () => {
    const response = await request(app)
      .get(rootURL)
      .set("authorization-jwt", `jwt ${auth.token}`);
    expect(response.body.length).toBe(2);
    expect(containsForbiddenField(response.body[0].main_user)).toBeFalsy();
    expect(response.body[response.body.length - 1]).toMatchObject(betResponse);
    expect(response.statusCode).toBe(200);
  });

  const userBetCases = [
    [1, 3],
    [2, 0],
  ];
  test.each(userBetCases)(
    "get bets by user id %p should return %p bets",
    async (userId, expectedNumberOfBets) => {
      const response = await request(app)
        .get(`${rootURL}/profile/${userId}`)
        .set("authorization-jwt", `jwt ${auth.token}`);
      expect(response.body.length).toBe(expectedNumberOfBets);
      expect(response.statusCode).toBe(200);
    }
  );
});
