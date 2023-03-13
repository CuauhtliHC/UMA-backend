const dayjs = require('dayjs');
const { request } = require('express');
const { status } = require('../config/statusOrders.json');
const searchStatus = require('../services/InProgressOrdersRequests');
const { getOrderIdRequest } = require('../services/ordersRequests');
const { getIdPackagesFromDb } = require('../services/packageRequests');

const req = request;

const validatePackageId = async (packageId) => {
  const packageInfo = await getIdPackagesFromDb(packageId);
  const date = dayjs().format('YYYY-MM-DD');
  const packageDate = dayjs(packageInfo.dateOfDelivery).format('YYYY-MM-DD');
  if (!packageInfo) {
    throw new Error('This package does not exist');
  } else if (date !== packageDate) {
    throw new Error(
      `The package is not dated today. Package date ${packageDate}`,
    );
  }
  req.packageInfo = packageInfo;
};

const validateOrderId = async (id) => {
  const order = await getOrderIdRequest(id);
  if (!order || order.deleted) {
    throw new Error('The order does not exist or was deleted');
  }
  if (
    order.InProgressOrder.status === status.cancelled
    || order.InProgressOrder.status === status.finished
  ) {
    throw new Error(
      'No se puede modificar debido a que se encuentra cancelado o finalizado',
    );
  }
  if (order.dataValues.Package.deleted) {
    throw new Error('The package was deleted');
  }

  req.order = order;
  return true;
};
const validateInProgres = async (statusOrder) => {
  const inProgressOrdersStatus = await searchStatus(status[statusOrder]);

  if (!inProgressOrdersStatus) {
    throw new Error('The order does not exist');
  }
  req.ordersStatus = inProgressOrdersStatus;
  return true;
};

const validateQuantity = (quantity) => {
  const { packageInfo } = req;
  if (!packageInfo) {
    return true;
  }
  if (
    parseInt(packageInfo.quantityInOrders, 10) + quantity
      > packageInfo.quantityOfPackages
    && packageInfo
  ) {
    throw new Error('more are being added to the existing ones');
  }
  return true;
};

const validationStatusOrder = async (statusOrder) => {
  const isValidStatusOrder = await searchStatus(statusOrder.toUpperCase());
  if (!isValidStatusOrder) {
    throw new Error('The state sent is not valid');
  }
};

module.exports = {
  validatePackageId,
  validateQuantity,
  validateOrderId,
  validationStatusOrder,
  validateInProgres,
};
