const { container } = require('../../loaders/container.loader');

const userService = container.resolve('userService');

const userResolver = {
  Query: {
    getUsers: async (_, { filter }) => await userService.getAllUsers(filter),
    getUserById: async (_, { id }) => await userService.getUserById(id),
  },
};

module.exports = userResolver;
