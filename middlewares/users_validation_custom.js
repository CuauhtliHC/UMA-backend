const User = require('../models/user');
const { Role } = require('../models');

const checkEmailExists = (value) => {
  return User.findOne({ where: { email: value } }).then((user) => {
    if (user) {
      const error = new Error(`El correo ${value} ya está en uso`);
      return Promise.reject(error);
    }
  });
};

const checkRolExists = (value) => {
  return Role.findOne({ where: { rol: value } }).then((resp) => {
    if (resp) {
      const error = new Error('No fue encontrado el rol en la BBDD');
      return Promise.reject(error);
    }
  });
};

module.exports = {
  checkEmailExists,
  checkRolExists,
};
