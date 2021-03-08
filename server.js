const { ApolloServer } = require('apollo-server');
const { PubSub } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const { getUserId } = require('./src/utils');
const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');
const User = require('./src/resolvers/User');
const Link = require('./src/resolvers/Link');
const Vote = require('./src/resolvers/Vote')
const Subscription = require('./src/resolvers/Subscription');

const pubsub = new PubSub()

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
  Vote,
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'src', 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: 
        req && req.headers.authorization
          ? getUserId(req)
          : null
    }
  }
})
server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
