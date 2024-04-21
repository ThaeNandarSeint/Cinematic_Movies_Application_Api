const { ApolloServer } = require('@apollo/server');
const { NODE_ENV } = require('./constants/env.constant');
const { loadContainer } = require('./loaders/container.loader');

loadContainer();

const apolloServer = new ApolloServer({
  nodeEnv: NODE_ENV,
});

module.exports = { apolloServer };
