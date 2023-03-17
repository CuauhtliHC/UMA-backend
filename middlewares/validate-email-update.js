const User = require('../models/user');

const checkEmailExistsInOtherUser = (value, { req }) => {
  return User.findOne({ where: { email: value } }).then((user) => {
    if (user && user.id !== req.params.id) {
      const error = new Error(`El correo ${value} ya está en uso`);
      return Promise.reject(error);
    }
  });
};

module.exports = { checkEmailExistsInOtherUser };
