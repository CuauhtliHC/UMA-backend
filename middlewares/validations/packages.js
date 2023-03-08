const { check } = require('express-validator');
const { validate } = require('../validate');
const {
  quantityGreaterThanCero,
  validatedDeliveryDate,
  validatedWeight,
} = require('../validate-package');

exports.validationsPost = [
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

exports.validationsPut = [
  check('quantityOfPackages').custom(quantityGreaterThanCero),
  check('id', 'the id has to be a Int').isInt(),
  check('weight').custom(validatedWeight),
  check('dateOfDelivery').custom(validatedDeliveryDate),
  validate,
];
