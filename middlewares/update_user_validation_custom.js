const User = require('../models/user');

const checkUserExists = (value) => {
  return User.findOne({ where: { id: value } }).then((findUser) => {
    if (!findUser) {
      const error = new Error(`User with id ${value} not found`);
      return Promise.reject(error);
    }
  });
};

module.exports = { checkUserExists };
