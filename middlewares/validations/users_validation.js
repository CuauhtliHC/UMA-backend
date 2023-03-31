const { check } = require('express-validator');
const { validate } = require('../validate');
const { checkEmailinUse } = require('../users_validation_custom');
const { checkUserExists } = require('../update_user_validation_custom');

const validateRegister = [
  check('name')
    .notEmpty()
    .withMessage('Ingrese datos en el campo nombre')
    .custom((value, { req }) => req.body.rol !== 'ADMIN_ROL')
    .withMessage('Peticion no valida'),
  check('email')
    .notEmpty()
    .withMessage('Ingrese datos en el campo email')
    .bail()
    .isEmail()
    .withMessage('Ingrese un correo valido')
    .custom(checkEmailinUse),
  check('password')
    .notEmpty()
    .withMessage('Ingrese datos en el campo contraseña')
    .bail()
    .matches(/\d/)
    .withMessage('Debe contener por lo menos un numero')
    .matches(/[A-Z]/)
    .withMessage('Debe contener por lo menos una letra mayuscula')
    .matches(/[a-z]/)
    .withMessage('Debe contener por lo menos una letra minuscula')
    .matches(/\W/)
    .withMessage('Debe contener por lo menos un caracter especial')
    .isLength({ min: 8 })
    .withMessage('Debe contener minimo 8 caracteres'),
  validate,
];

const validateCheckUserIdExists = [
  check('id').notEmpty().withMessage('Id no valido').custom(checkUserExists),
  validate,
];

module.exports = {
  validateRegister,
  validateCheckUserIdExists,
};
