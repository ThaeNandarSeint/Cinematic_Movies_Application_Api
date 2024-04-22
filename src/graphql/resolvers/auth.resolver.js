const { container } = require('../../loaders/container.loader');

const authService = container.resolve('authService');

module.exports = {
  Mutation: {
    register: async (_, { data }) => await authService.register(data),
    login: async (_, { data }) => await authService.login(data),
  },
};
