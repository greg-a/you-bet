const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const joinMonster = require('join-monster')

const { Client } = require('pg')
const client = new Client({
  host: "localhost",
  user: "admin",
  password: "imUHMaf@YOh#",
  database: "postgres"
})
client.connect();

const User = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    username: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    first_name: { type: graphql.GraphQLString },
    last_name: { type: graphql.GraphQLString },
    created_at: { type: graphql.GraphQLString },
    updated_at: { type: graphql.GraphQLString },
  })
});

User._typeConfig = {
  sqlTable: 'user',
  uniqueKey: 'id',
}

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    },
    users: {
      type: new graphql.GraphQLList(User),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    user: {
      type: User,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (userTable, args, context) => `${userTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
  })
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });


const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
