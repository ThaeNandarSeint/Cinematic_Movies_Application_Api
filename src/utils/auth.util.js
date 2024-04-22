const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE_TIME,
} = require('../constants/env.constant');
const {
  INVALID_TOKEN,
  TOKEN_EXPIRED,
} = require('../constants/errors/auth.error.constant');
const { sendFailedResponse } = require('./response.util');
const {
  UNAUTHENTICATED,
} = require('../constants/errors/global.error.constant');
const { container } = require('../loaders/container.loader');

const verifyPassword = async (plainText, encrypted) => {
  return await bcrypt.compare(plainText, encrypted);
};

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRE_TIME },
      (error, token) => {
        if (error) reject(error);

        resolve(token);
      }
    );
  });
};

const verifyToken = (
  token,
  errorMessages = {
    invalid: INVALID_TOKEN,
    expired: TOKEN_EXPIRED,
  }
) => {
  if (typeof token !== 'string') {
    sendFailedResponse({
      ...UNAUTHENTICATED,
      message: errorMessages.expired,
    });
  }
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      sendFailedResponse({
        ...UNAUTHENTICATED,
        message: errorMessages.expired,
      });
    } else {
      sendFailedResponse({
        ...UNAUTHENTICATED,
        message: errorMessages.invalid,
      });
    }
  }
};

const authenticate = async (bearerToken) => {
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    sendFailedResponse(UNAUTHENTICATED);
  }

  const [, token] = bearerToken.split(' ');

  if (!token) {
    sendFailedResponse(UNAUTHENTICATED);
  }

  const decoded = verifyToken(token);

  const { adminId } = decoded;

  const adminRepository = container.resolve('adminRepository');

  const admin = await adminRepository.getAdminById(adminId);

  if (!admin || !admin.isActive) {
    sendFailedResponse(UNAUTHENTICATED);
  }

  return { admin };
};

module.exports = {
  verifyPassword,
  generateToken,
  verifyToken,
  authenticate,
};
