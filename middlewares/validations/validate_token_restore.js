const { check } = require('express-validator');
const { validate } = require('../validate');
const { isExpiredToken, isExistsToken, checkUserWithTokenExists } = require('../validate_token_custom');

const validateTokenRestorePassword = [
  check('token')
    .notEmpty()
    .withMessage('Ingrese datos en el campo token')
    .bail()
    .custom(isExistsToken)
    .bail()
    .custom(isExpiredToken)
    .bail()
    .custom(checkUserWithTokenExists),
  validate,
];

module.exports = { validateTokenRestorePassword };
