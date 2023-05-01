const { Router } = require('express');
const { validateAdmin } = require('../middlewares/auth');
const getOrdersAndPackages = require('../controllers/ordersAndPackage');

const route = Router();

route.get('/all/:day', getOrdersAndPackages);

module.exports = route;
