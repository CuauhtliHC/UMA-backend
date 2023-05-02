const { request, response } = require('express');
const { Sequelize } = require('sequelize');
const dayjs = require('dayjs');
const { Package, Order, InProgressOrders } = require('../models');

const getOrdersAndPackages = async (req = request, res = response) => {
  const { day } = req.params;
  const dateStart = dayjs(day).startOf('day').toDate();
  const dateEnd = dayjs(day).endOf('day').toDate();
  const [packages, orders] = await Promise.all([
    Package.findAll({
      order: ['id'],
      where: {
        dateOfDelivery: { [Sequelize.Op.between]: [dateStart, dateEnd] },
        deleted: false,
      },
    }),
    Order.findAll({
      order: ['id'],
      include: [
        { model: Package, as: 'Package' },
        {
          model: InProgressOrders,
          as: 'InProgressOrder',
        },
      ],
      where: {
        createdAt: {
          [Sequelize.Op.between]: [dateStart, dateEnd],
        },
      },
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
