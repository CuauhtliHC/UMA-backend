const { Router } = require('express');
const {
  getOrders,
  getOrdersId,
  postOrders,
  deletedOrders,
  statusOrderChange,
  getOrdersByUser,
} = require('../controllers/ordersControllers');

const {
  validationsId,
} = require('../middlewares/validations/generic_validations');
const {
  validationPost,
  validationGet,
  validationDeleted,
  validationChangeStatus,
} = require('../middlewares/validations/orders');

const router = Router();

router.get('/', validationGet, getOrders);
router.get('/byUser/:idUser', getOrdersByUser);
router.get('/deleted', validationGet, getOrders);
router.get('/byId/:id', validationsId, getOrdersId);
router.post('/create/', validationPost, postOrders);
router.put(
  '/status/:statusOrder/:id',
  validationChangeStatus,
  statusOrderChange,
);
router.delete('/delete/:id', validationDeleted, deletedOrders); // usar para el tachito

module.exports = router;
