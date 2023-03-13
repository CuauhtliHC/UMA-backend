const { check, query } = require('express-validator');
const { validateAuth, validateAdmin } = require('../auth');
const { validate } = require('../validate');
const {
  validateQuantity,
  validatePackageId,
  validateOrderId,
  validationStatusOrder,
  validateInProgres,
} = require('../validation-orders');

const validationPost = [
  validateAuth,
  check('packageId', 'PackageId field cannot be empty').not().isEmpty(),
  check('packageId', 'Value must be an integer').isInt(),
  check('packageId').custom(validatePackageId),
  check('quantity', 'Quantity field cannot be empty').not().isEmpty(),
  check('quantity', 'Value must be an integer').isInt(),
  check('quantity').custom(validateQuantity),
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
  query('idPackage', 'Value must be an integer')
    .optional()
    .isInt(),
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
