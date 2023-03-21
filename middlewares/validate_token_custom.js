const RecoveryToken = require('../models/recoveryToken');
const { checkUserExists } = require('./update_user_validation_custom');

const isExistsToken = (value) => {
  return RecoveryToken.findOne({ where: { token: value } }).then((token) => {
    if (!token) {
      const error = new Error('El token no es valido');
      return Promise.reject(error);
    }
  });
};

const isExpiredToken = (value) => {
  return RecoveryToken.findOne({ where: { token: value } }).then((token) => {
    const now = new Date();
    const expirationDate = new Date(
      token.createdAt.getTime() + 24 * 60 * 60 * 1000,
    );
    const isExpired = now > expirationDate;
    if (isExpired) {
      const error = new Error('El token ha expirado');
      return Promise.reject(error);
    }
  });
};

const checkUserWithTokenExists = (value) => {
  return RecoveryToken.findOne({ where: { token: value } }).then((token) => {
    return checkUserExists(token.userId);
  });
};

module.exports = { isExpiredToken, isExistsToken, checkUserWithTokenExists };
