const {
  WRONG_CREDENTIALS,
} = require('../constants/errors/auth.error.constant');
const { BAD_REQUEST } = require('../constants/errors/global.error.constant');
const {
  USER_ALREADY_EXIST,
} = require('../constants/errors/user.error.constant');
const { generateToken, verifyPassword } = require('../utils/auth.util');
const { sendFailedResponse } = require('../utils/response.util');

module.exports = ({ userRepository }) => {
  const register = async (payload) => {
    const { email } = payload;

    const existingUser = await userRepository.getUserByUniqueField(
      'email',
      email
    );

    if (existingUser) {
      sendFailedResponse({ ...BAD_REQUEST, message: USER_ALREADY_EXIST });
    }

    const user = await userRepository.createUser(payload);

    const token = await generateToken({ userId: user._id });

    return { user, token };
  };

  const login = async (payload) => {
    const { email, password } = payload;

    const user = await userRepository.getUserByUniqueField(
      'email',
      email,
      '+password'
    );

    if (!user) {
      sendFailedResponse({ ...BAD_REQUEST, message: WRONG_CREDENTIALS });
    }

    const isCorrectPassword = await verifyPassword(password, user.password);

    if (!isCorrectPassword) {
      sendFailedResponse({ ...BAD_REQUEST, message: WRONG_CREDENTIALS });
    }

    user.password = undefined;

    const token = await generateToken({ userId: user._id });

    return { user, token };
  };

  return {
    register,
    login,
  };
};
