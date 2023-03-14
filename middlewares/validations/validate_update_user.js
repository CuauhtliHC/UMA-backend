const { check } = require('express-validator');
const { checkUserExists } = require('../update_user_validation_custom');
const { validate } = require('../validate');

const validateUpdate = [
  check('id').notEmpty().withMessage('Id no valido').custom(checkUserExists),
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
    .withMessage('Ingrese un correo valido'),
  validate,
];

module.exports = { validateUpdate };
