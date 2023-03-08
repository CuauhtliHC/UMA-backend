const dayjs = require('dayjs');
const { request } = require('express');
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
  if (!order) {
    throw new Error('The order does not exist');
  }
  req.order = order;
  if (order.dataValues.Package.deleted) {
    throw new Error('The package was deleted');
  }
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
};
