const { request, response } = require('express');
const { status } = require('../config/statusOrders.json');
const { buildObject } = require('../helpers/buildObject');
const searchStatus = require('../services/InProgressOrdersRequests');
const {
  postOrder,
  putOrderPackage,
  getOrdersRequest,
  deleteOrderRequest,
  getOrderIdRequest,
} = require('../services/ordersRequests');

const getOrders = async (req = request, res = response) => {
  const { statusOrder, idPackage } = req.query;
  const { path } = req;
  const query = {};
  if (idPackage) query.idPackage = { id: idPackage };
  if (statusOrder) query.status = { status: statusOrder.toUpperCase() };
  if (path === '/') {
    await getOrdersRequest(query, res);
  } else {
    await getOrdersRequest(query, res, true);
  }
};

const getOrdersId = async (req = request, res = response) => {
  const { id } = req.params;
  await getOrderIdRequest(id, res);
};
const postOrders = async (req = request, res = response) => {
  const { quantity } = req.body;
  const statusOrder = await searchStatus(status.pending);

  await postOrder({ quantity }, statusOrder, req.packageInfo, res);
};
const putOrders = async (req = request, res = response) => {
  const dataUpdate = buildObject(req.body);
  const { order } = req;
  await putOrderPackage(dataUpdate, order, res);
};
const deletedOrders = async (req = request, res = response) => {
  const { order } = req;
  await deleteOrderRequest(order, res);
};

module.exports = {
  getOrders,
  getOrdersId,
  postOrders,
  putOrders,
  deletedOrders,
};
