const request = require("supertest");
const app = require("../app");
const db = require("../models");
const { login } = require("./helpers");
const { bet, expiredBet, user, user2 } = require("./constants");

describe("Followers endpoint", () => {
  const rootURL = "/api/followers";
  let auth1 = {};
  let auth2 = {};

  beforeAll(async () => {
    try {
      await db.sequelize.sync({ force: true });
      await db.users.bulkCreate([user, user2]);
      const loginResponse1 = await login(user.username, user.password);
      const loginResponse2 = await login(user2.username, user2.password);
      auth1 = loginResponse1.body;
      auth2 = loginResponse2.body;
      await db.bets.bulkCreate([
        bet,
        { ...bet, mainUserId: auth2.userData.id },
        expiredBet,
      ]);
    } catch (err) {
      console.log({ err });
    }
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test("It should successfully follow user2", async () => {
    const response = await request(app)
      .post(`${rootURL}/${auth2.userData.id}`)
      .set("authorization-jwt", `jwt ${auth1.token}`);

    expect(response.body).toMatchObject({
      notificationsOn: true,
      id: expect.any(Number),
      mainUserId: auth1.userData.id,
      followedUserId: auth2.userData.id,
      followed_user: expect.any(Object),
    });
    expect(response.statusCode).toBe(200);
  });

  test("You should not be able to follow yourself", async () => {
    const response = await request(app)
      .post(`${rootURL}/${auth1.userData.id}`)
      .set("authorization-jwt", `jwt ${auth1.token}`);

    expect(response.statusCode).toBe(400);
  });

  test("user2 should have one follower", async () => {
    const response = await request(app)
      .get(rootURL)
      .set("authorization-jwt", `jwt ${auth2.token}`);

    expect(response.body.followingList.length).toBe(0);
    expect(response.body.followerList.length).toBe(1);
    expect(response.statusCode).toBe(200);
  });

  test("user1 should be following one user", async () => {
    const response = await request(app)
      .get(rootURL)
      .set("authorization-jwt", `jwt ${auth1.token}`);

    expect(response.body.followingList.length).toBe(1);
    expect(response.body.followerList.length).toBe(0);
    expect(response.statusCode).toBe(200);
  });

  test("user1 should see user2's bet after following", async () => {
    const response = await request(app)
      .get("/api/bets")
      .set("authorization-jwt", `jwt ${auth1.token}`);

    expect(response.body.length).toBe(2);
    expect(response.statusCode).toBe(200);
  });

  test("You should be able to unfollow user", async () => {
    const response = await request(app)
      .delete(`${rootURL}/${auth2.userData.id}`)
      .set("authorization-jwt", `jwt ${auth1.token}`);

    expect(response.statusCode).toBe(200);
  });

  test("user1 should not see user2's bet after unfollowing", async () => {
    const response = await request(app)
      .get("/api/bets")
      .set("authorization-jwt", `jwt ${auth1.token}`);

    expect(response.body.length).toBe(1);
    expect(response.statusCode).toBe(200);
  });
});
