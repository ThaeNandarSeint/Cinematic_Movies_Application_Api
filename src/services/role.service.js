const { BAD_REQUEST } = require('../constants/errors/global.error.constant');
const { ROLE_NOT_FOUND } = require('../constants/errors/role.error.constant');
const { sendFailedResponse } = require('../utils/response.util');

module.exports = ({ roleRepository }) => {
  const createRole = async (data) => {
    return await roleRepository.createRole(data);
  };

  const getAllRoles = async (query) => {
    return await roleRepository.getAllRoles(query);
  };

  const getRoleById = async (id) => {
    const role = await roleRepository.getRoleById(id);
    if (!role) {
      sendFailedResponse({ ...BAD_REQUEST, message: ROLE_NOT_FOUND });
    }
    return role;
  };

  const updateRole = async (id, data) => {
    await getRoleById(id);
    return await roleRepository.updateRoleById(id, data);
  };

  const deleteRole = async (id) => {
    await getRoleById(id);
    await roleRepository.deleteRole({ id });
  };

  return {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
  };
};
