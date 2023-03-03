const { Router } = require('express');
const { check } = require('express-validator');
const {
  getPackageAll,
  getPackageToday,
  postPackage,
  putPackage,
  deletePackage,
  getPackageId,
} = require('../controllers/packageControllers');
const { validateBody } = require('../middlewares/validate-body');
const { quantityGreaterThanCero } = require('../middlewares/validate-package');

const route = Router();

route.get('/', getPackageAll);
route.get('/today', getPackageToday);
route.get(
  '/:id',
  [check('id', 'the id has to be a Int').isInt(), validateBody],
  getPackageId,
);
route.post(
  '/',
  [
    check('address', 'Address field required').not().isEmpty(),
    check('addresses', 'addresses field required').not().isEmpty(),
    check('weight', 'weight field required').not().isEmpty(),
    check('weight', 'The weight field must be a Float').isFloat(),
    check('dateOfDelivery', 'dateOfDelivery field required').not().isEmpty(),
    check(
      'dateOfDelivery',
      'The field dateOfDelivery must be a datewith the format YYYY-MM-DD',
    ).isDate({
      format: 'YYYY-MM-DD',
    }),
    check('quantityOfPackages', 'quantityOfPackages field required')
      .not()
      .isEmpty(),
    check('quantityOfPackages').custom(quantityGreaterThanCero),
    validateBody,
  ],
  postPackage,
);
route.put(
  '/:id',
  [check('id', 'the id has to be a Int').isInt(), validateBody],
  putPackage,
);
route.delete(
  '/:id',
  [check('id', 'the id has to be a Int').isInt(), validateBody],
  deletePackage,
);

module.exports = route;
