const { check } = require('express-validator');
const { validate } = require('../validate');

const validateLimit = [
  check('limit')
    .exists()
    .withMessage('El limit es requerido')
    .bail()
    .isInt()
    .withMessage('El limit debe ser entero')
    .custom((value) => value > 2)
    .withMessage('El limit debe ser mayor que 2'),
  validate,
];

module.exports = { validateLimit };
