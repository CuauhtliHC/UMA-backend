const User = require('../models/user');

const checkUserExists = (id) => {
  return User.findOne({ where: { id } }).then((findUser) => {
    if (!findUser) {
      const error = new Error(`User with id ${id} not found`);
      return Promise.reject(error);
    }
  });
};

module.exports = { checkUserExists };
