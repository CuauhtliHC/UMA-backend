const { check } = require('express-validator');
const { validate } = require('../validate');

const validateLimit = [
  check('limit')
    .exists()
    .withMessage('El limit es requerido')
    .bail()
    .isInt()
    .withMessage('El limit debe ser entero')
    .custom((value) => value > 5)
    .withMessage('El limit debe ser mayor que 5'),
  validate,
];

module.exports = { validateLimit };
