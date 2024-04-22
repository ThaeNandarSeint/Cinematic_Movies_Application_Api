const { GraphQLError } = require('graphql');

const sendFailedResponse = ({ message, code, status }) => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      http: {
        status,
      },
    },
  });
};

module.exports = { sendFailedResponse };
