const {
  ADMIN_ALREADY_EXIST,
} = require('../constants/errors/admin.error.constant');
const {
  WRONG_CREDENTIALS,
} = require('../constants/errors/auth.error.constant');
const { BAD_REQUEST } = require('../constants/errors/global.error.constant');
const { generateToken, verifyPassword } = require('../utils/auth.util');
const { sendFailedResponse } = require('../utils/response.util');

module.exports = ({ adminRepository }) => {
  const register = async (payload) => {
    const { email } = payload;

    const existingAdmin = await adminRepository.getAdminByUniqueField(
      'email',
      email
    );

    if (existingAdmin) {
      sendFailedResponse({ ...BAD_REQUEST, message: ADMIN_ALREADY_EXIST });
    }

    const admin = await adminRepository.createAdmin(payload);

    const token = await generateToken({ adminId: admin._id });

    return { admin, token };
  };

  const login = async (payload) => {
    const { email, password } = payload;

    const admin = await adminRepository.getAdminByUniqueField(
      'email',
      email,
      '+password'
    );

    if (!admin) {
      sendFailedResponse({ ...BAD_REQUEST, message: WRONG_CREDENTIALS });
    }

    const isCorrectPassword = await verifyPassword(password, admin.password);

    if (!isCorrectPassword) {
      sendFailedResponse({ ...BAD_REQUEST, message: WRONG_CREDENTIALS });
    }

    admin.password = undefined;

    const token = await generateToken({ adminId: admin._id });

    return { admin, token };
  };

  return {
    register,
    login,
  };
};
