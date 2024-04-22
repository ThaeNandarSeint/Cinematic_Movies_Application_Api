const { container } = require('../../loaders/container.loader');
const { authenticate } = require('../../utils/auth.util');

const adminService = container.resolve('adminService');

const adminResolver = {
  Query: {
    getAdmins: async (_, { filter }, { token }) => {
      await authenticate(token);
      return await adminService.getAllAdmins(filter);
    },
    getAdminById: async (_, { id }, { token }) => {
      await authenticate(token);
      return await adminService.getAdminById(id);
    },
  },
};

module.exports = adminResolver;
