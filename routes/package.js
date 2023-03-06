const { Router } = require('express');
const {
  getPackageAll,
  getPackageToday,
  postPackage,
  putPackage,
  deletePackage,
  getPackageId,
} = require('../controllers/packageControllers');
const { validateBody } = require('../middlewares/validate-body');
const { validationsPost, validationsId, validationsPut } = require('../middlewares/validations/packages');

const route = Router();

route.get('/', getPackageAll);
route.get('/today', getPackageToday);
route.get(
  '/:id',
  [validationsId, validateBody],
  getPackageId,
);
route.post(
  '/',
  [
    validationsPost,
    validateBody,
  ],
  postPackage,
);
route.put(
  '/:id',
  [validationsPut, validateBody],
  putPackage,
);
route.delete(
  '/:id',
  [validationsId, validateBody],
  deletePackage,
);

module.exports = route;
