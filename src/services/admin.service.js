const { ADMIN_NOT_FOUND } = require('../constants/errors/admin.error.constant');
const { BAD_REQUEST } = require('../constants/errors/global.error.constant');
const { verifyPassword } = require('../utils/auth.util');
const { sendFailedResponse } = require('../utils/response.util');

module.exports = ({ adminRepository }) => {
  const getAllAdmins = async (query) => {
    return await adminRepository.getAllAdmins(query);
  };

  const getAdminById = async (id) => {
    const admin = await adminRepository.getAdminById(id);
    if (!admin) {
      sendFailedResponse({ ...BAD_REQUEST, message: ADMIN_NOT_FOUND });
    }
    return admin;
  };

  const updateAdmin = async (id, data) => {
    await getAdminById(id);
    return await adminRepository.updateAdminById(id, data);
  };

  const updateOwnPassword = async (id, data) => {
    const { oldPassword, password } = data;

    const admin = await adminRepository.getAdminById(id, '+password');

    const isCorrectPassword = await verifyPassword(oldPassword, admin.password);

    if (!isCorrectPassword) {
      // throw ApiError.badRequest(INCORRECT_PASSWORD);
    }

    return await adminRepository.updateAdminById(id, {
      password,
    });
  };

  const deleteAdmin = async (id) => {
    await getAdminById(id);
    await adminRepository.deleteAdmin({ id });
  };

  return {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    updateOwnPassword,
    deleteAdmin,
  };
};
