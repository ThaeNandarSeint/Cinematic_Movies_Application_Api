const { ApolloServer } = require('@apollo/server');
const { NODE_ENV } = require('./constants/env.constant');
const { loadContainer } = require('./loaders/container.loader');
const { typeDefs } = require('./graphql/types');

loadContainer();

const resolvers = require('./graphql/resolvers');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  nodeEnv: NODE_ENV,
});

module.exports = { apolloServer };
