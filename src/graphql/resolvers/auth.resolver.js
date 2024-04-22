const { container } = require('../../loaders/container.loader');

const authService = container.resolve('authService');

const userResolver = {
  Mutation: {
    register: async (_, { data }) => await authService.register(data),
    login: async (_, { data }) => await authService.login(data),
  },
};

module.exports = userResolver;
