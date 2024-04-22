const { container } = require('../../loaders/container.loader');
const { authenticate } = require('../../utils/auth.util');

const roleService = container.resolve('roleService');

module.exports = {
  Query: {
    getAllRoles: async (_, { filter }, { token }) => {
      await authenticate(token);
      return await roleService.getAllRoles(filter);
    },
    getRoleById: async (_, { id }, { token }) => {
      await authenticate(token);
      return await roleService.getRoleById(id);
    },
  },
  Mutation: {
    createRole: async (_, { data }, { token }) => {
      await authenticate(token);
      return await roleService.createRole(data);
    },
    updateRole: async (_, { id, data }, { token }) => {
      await authenticate(token);
      return await roleService.updateRole(id, data);
    },
  },
};
