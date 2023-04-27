const { check, query } = require('express-validator');
const { validateAuth, validateAdmin } = require('../auth');
const { validate } = require('../validate');
const {
  validateOrderId,
  validationStatusOrder,
  validateInProgres,
  validateListPkg,
} = require('../validation-orders');

const validationPost = [
  validateAuth,
  check('list', 'Package array cannot be empty')
    .isArray({ min: 1 })
    .custom(validateListPkg),
  validate,
];

const validationDeleted = [
  validateAuth,
  validateAdmin,
  check('id', 'Value must be an integer').isInt(),
  check('id').custom(validateOrderId),
  validate,
];
const validationGet = [
  validateAuth,
  query('idPackage', 'Value must be an integer').optional().isInt(),
  check('statusOrder').optional().custom(validationStatusOrder),
  validate,
];

const validationChangeStatus = [
  validateAuth,
  check('id', 'Value must be an integer').isInt(),
  check('id').custom(validateOrderId),
  check('statusOrder').custom(validateInProgres),
  validate,
];

module.exports = {
  validationPost,
  validationGet,
  validationDeleted,
  validationChangeStatus,
};
