require('dotenv').config();
const { startStandaloneServer } = require('@apollo/server/standalone');
const { connectDatabase } = require('./loaders/database.loader');
const { validateEnvVariables } = require('./loaders/env.loader');
const { apolloServer } = require('./app');
const { PORT } = require('./constants/env.constant');

(async function () {
  validateEnvVariables();
  await connectDatabase();

  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: PORT },
  });

  console.log(`🚀 Server is ready at: ${url}`);
})();
