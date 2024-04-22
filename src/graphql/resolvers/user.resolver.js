const { container } = require('../../loaders/container.loader');
const { authenticate } = require('../../utils/auth.util');

const userService = container.resolve('userService');

const userResolver = {
  Query: {
    getUsers: async (_, { filter }, { token }) => {
      await authenticate(token);
      return await userService.getAllUsers(filter);
    },
    getUserById: async (_, { id }, { token }) => {
      await authenticate(token);
      return await userService.getUserById(id);
    },
  },
};

module.exports = userResolver;
