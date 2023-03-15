const { faker } = require("@faker-js/faker");

const generateUsers = (count = 1) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push({
      username: faker.internet.userName(firstName, lastName).slice(0, 20),
      name: `${firstName} ${lastName}`,
      password: faker.internet.password(10),
      email: faker.internet.email(firstName, lastName),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return users;
};

exports.generateUsers = generateUsers;
