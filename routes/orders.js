const { Router } = require('express');
const {
  getOrders,
  getOrdersId,
  postOrders,
  putOrders,
  deletedOrders,
} = require('../controllers/ordersControllers');

const {
  validationsId,
} = require('../middlewares/validations/generic_validations');
const {
  validationPost,
  validationPut,
  validationGet,
  validationDeleted,
} = require('../middlewares/validations/orders');

const router = Router();

router.get('/', validationGet, getOrders);
router.get('/deleted', validationGet, getOrders);
router.get('/:id', validationsId, getOrdersId);
router.post('create/', validationPost, postOrders);
router.put('edit/:id', validationPut, putOrders);
router.delete('delete/:id', validationDeleted, deletedOrders);

module.exports = router;
