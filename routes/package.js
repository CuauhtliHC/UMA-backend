const { Router } = require('express');
const {
  getPackageAll,
  getPackageToday,
  postPackage,
  putPackage,
  deletePackage,
  getPackageId,
  getDescriptionPackageByDay,
} = require('../controllers/packageControllers');
const {
  validationsId,
} = require('../middlewares/validations/generic_validations');
const {
  validationsPostPakage,
  validationsPutPakage,
  validationDeletedPakage,
} = require('../middlewares/validations/packages');

const { validateAdmin } = require('../middlewares/auth');

const route = Router();

route.get('/', validateAdmin, getPackageAll);
route.get('/today', getPackageToday);
route.get('/descriptionDay/:day', getDescriptionPackageByDay);
route.get('/:id', validationsId, getPackageId);
route.post('/create', validationsPostPakage, postPackage);
route.put('/:id', validationsPutPakage, putPackage);
route.delete('/:id', validationDeletedPakage, deletePackage);

module.exports = route;
