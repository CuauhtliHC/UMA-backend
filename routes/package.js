const { Router } = require('express');
const {
  getPackageAll,
  getPackageToday,
  postPackage,
  putPackage,
  deletePackage,
  getPackageId,
} = require('../controllers/packageControllers');
const {
  validationsId,
} = require('../middlewares/validations/generic_validations');
const {
  validationsPost,
  validationsPut,
} = require('../middlewares/validations/packages');

const { validateAdmin } = require('../middlewares/auth');

const route = Router();

route.get('/', validateAdmin, getPackageAll);
route.get('/today', getPackageToday);
route.get('/:id', validationsId, getPackageId);
route.post('/', validationsPost, postPackage);
route.put('/:id', validationsPut, putPackage);
route.delete('/:id', validationsId, deletePackage);

module.exports = route;
