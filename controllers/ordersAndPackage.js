const { request, response } = require('express');
const { Package, Order } = require('../models');

const getOrdersAndPackages = async (req = request, res = response) => {
  const [packages, orders] = await Promise.all([
    Package.findAll({
      order: ['id'],
    }),
    Order.findAll({
      order: ['id'],
      include: { all: true },
    }),
  ]);
  const allPackage = packages.filter(
    (packageOne) => !orders.some(
      (order) => packageOne.dataValues.id === order.dataValues.PackageId,
    )
      || packageOne.dataValues.quantityOfPackages
        !== packageOne.dataValues.quantityInOrders,
  );
  const all = allPackage.concat(orders);
  res.status(200).json({
    msg: 'All Packege and Orders',
    total: all.length,
    all,
  });
};

module.exports = getOrdersAndPackages;
