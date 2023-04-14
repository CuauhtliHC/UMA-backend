const { check } = require('express-validator');
const { validateAuth } = require('../auth');
const { validate } = require('../validate');
const validateDDJJ = require('../validationDDJJ');

const validationSwornStatementPost = [
  validateAuth,
  validateDDJJ,
  check('firstAnswer', 'firstAnswer field cannot be empty').not().isEmpty(),
  check('secondAnswer', 'secondAnswer field cannot be empty').not().isEmpty(),
  check('thirdAnswer', 'thirdAnswer field cannot be empty').not().isEmpty(),
  check('firstAnswer', 'Value must be a Boolean').not().isString(),
  check('firstAnswer', 'Value must be a Boolean').isBoolean(),
  check('secondAnswer', 'Value must be a Boolean').not().isString(),
  check('secondAnswer', 'Value must be a Boolean').isBoolean(),
  check('thirdAnswer', 'Value must be a Boolean').not().isString(),
  check('thirdAnswer', 'Value must be a Boolean').isBoolean(),
  validate,
];

module.exports = {
  validationSwornStatementPost,
};
