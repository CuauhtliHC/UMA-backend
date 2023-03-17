const { check } = require('express-validator');
const { validate } = require('../validate');
const { checkEmailExistsInOtherUser } = require('../validate-email-update');

const validateUpdate = [
  check('name')
    .notEmpty()
    .withMessage('Ingrese datos en el campo nombre')
    .custom((value, { req }) => req.body.rol !== 'ADMIN_ROL')
    .withMessage('Peticion no valida'),
  check('email')
    .notEmpty()
    .withMessage('Ingrese datos en el campo email')
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage('Ingrese un correo valido')
    .bail()
    .custom(checkEmailExistsInOtherUser),
  validate,
];

module.exports = { validateUpdate };
