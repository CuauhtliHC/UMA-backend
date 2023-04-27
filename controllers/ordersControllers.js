const { request, response } = require('express');
const { status } = require('../config/statusOrders.json');
const { statusUser } = require('../config/statusUsers.json');
const searchStatus = require('../services/InProgressOrdersRequests');
const {
  postOrder,
  getOrdersRequest,
  deleteOrderRequest,
  getOrderIdRequest,
  canceladoOrder,
} = require('../services/ordersRequests');
const searchStatusUser = require('../services/statusUsersRequests');
const { userByIdService } = require('../services/usersServices');

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
  const { user } = res;
  const { quantity } = req.body;
  const findUser = await userByIdService(user.id);
  const statusOrder = await searchStatus(status.pending);
  const statusUserInProgress = await searchStatusUser(statusUser.inProgress);
  await findUser.setStatusUsers(statusUserInProgress);

  // await postOrder({ quantity }, statusOrder, req.packageInfo, findUser, res);
};

const deletedOrders = async (req = request, res = response) => {
  const { order } = req;
  await deleteOrderRequest(order, res);
};

const statusOrderChange = async (req = request, res = response) => {
  const { ordersStatus, order } = req;
  const { id } = req.params;
  if (ordersStatus.status === status.cancelled) {
    await canceladoOrder(order, ordersStatus);
  } else {
    await order.setInProgressOrder(ordersStatus);
  }
  await getOrderIdRequest(id, res);
};

module.exports = {
  getOrders,
  getOrdersId,
  postOrders,
  deletedOrders,
  statusOrderChange,
};
