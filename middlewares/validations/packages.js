const { check } = require('express-validator');
const { validateAuth, validateAdmin } = require('../auth');
const { validate } = require('../validate');
const {
  quantityGreaterThanCero,
  validatedDeliveryDate,
  validatedWeight,
} = require('../validate-package');

const validationsPostPakage = [
  validateAuth,
  check('address', 'Address field required').not().isEmpty(),
  check('addresses', 'addresses field required').not().isEmpty(),
  check('weight', 'weight field required').not().isEmpty(),
  check('dateOfDelivery', 'dateOfDelivery field required').not().isEmpty(),
  check('quantityOfPackages', 'quantityOfPackages field required')
    .not()
    .isEmpty(),
  check('quantityOfPackages').custom(quantityGreaterThanCero),
  check('dateOfDelivery').custom(validatedDeliveryDate),
  check('weight').custom(validatedWeight),
  validate,
];

const validationsPutPakage = [
  validateAuth,
  validateAdmin,
  check('quantityOfPackages').custom(quantityGreaterThanCero),
  check('id', 'the id has to be a Int').isInt(),
  check('address', 'the Address has to be a String').isString(),
  check('addresses', 'the Addresses has to be a String').isString(),
  check('weight').custom(validatedWeight),
  check('dateOfDelivery').custom(validatedDeliveryDate),
  validate,
];

const validationDeletedPakage = [
  validateAuth,
  validateAdmin,
  check('id', 'the id has to be a Int').isInt(),
  validate,
];

module.exports = {
  validationDeletedPakage,
  validationsPutPakage,
  validationsPostPakage,
};
