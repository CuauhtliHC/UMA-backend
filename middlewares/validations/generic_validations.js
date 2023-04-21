const { check } = require('express-validator');
const { validate } = require('../validate');

const validationsId = [check('id', 'the id has to be a Int').isInt(), validate];

module.exports = {
  validationsId,
};
