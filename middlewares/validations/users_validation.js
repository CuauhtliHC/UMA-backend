const { check } = require('express-validator');
const { checkEmailExists, checkRolExists } = require('../users_validation_custom');

const validateRegister = [
  check('name')
    .notEmpty()
    .withMessage('Ingrese datos en el campo nombre')
    .custom((value, { req }) => !req.body.isAdmin) // cambiar de acuerdo al rol admin
    .withMessage('Peticion no valida')
    .custom((value, { req }) => !req.body.SuperAdmin) // cambiar de acuerdo al rol admin
    .withMessage('Peticion no valida'),
  check('email')
    .notEmpty()
    .withMessage('Ingrese datos en el campo email')
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage('Ingrese un correo valido')
    .custom(checkEmailExists),
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
    .withMessage('Debe contener minimo 6 caracteres'),
  check('userRol')
    .notEmpty()
    .withMessage('Ingrese datos en el campo rol')
    .bail()
    .custom(checkRolExists),
];

module.exports = {
  validateRegister,
};
