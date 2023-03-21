const { check } = require('express-validator');
const { validate } = require('../validate');
const { checkEmailExists } = require('../validate-email-update');

const validateCheckEmail = [
  check('email')
    .notEmpty()
    .withMessage('Ingrese datos en el campo email')
    .bail()
    .custom(checkEmailExists),
  validate,
];

module.exports = {
  validateCheckEmail,
};
