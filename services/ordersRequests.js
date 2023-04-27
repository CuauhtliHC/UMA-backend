const { Sequelize } = require('sequelize');
const { status } = require('../config/statusOrders.json');
const { Order, InProgressOrders, Package } = require('../models');
const searchStatus = require('./InProgressOrdersRequests');
const { putPackagesFromDb } = require('./packageRequests');

const restPackage = async (orderPackage, res) => {
  const data = {
    quantityInOrders:
      parseInt(orderPackage.Package.quantityInOrders, 10)
      - parseInt(orderPackage.quantity, 10),
  };
  try {
    await putPackagesFromDb(orderPackage.Package, data);
  } catch (error) {
    res.status(500).json({
      msg: 'Error restPackage()',
      location: 'services/ordersRequests.js/',
      error,
    });
  }
};
const addPackage = async (orderPackage, res) => {
  const data = {
    quantityInOrders:
      parseInt(orderPackage.Package.quantityInOrders, 10)
      + parseInt(orderPackage.quantity, 10),
  };
  try {
    await putPackagesFromDb(orderPackage.Package, data);
  } catch (error) {
    res.status(500).json({
      msg: 'Error addPackage()',
      location: 'services/ordersRequests.js/',
      error,
    });
  }
};
const getOrderIdRequest = async (id, res = null) => {
  try {
    const order = await Order.findByPk(id, {
      include: [
        { model: Package, as: 'Package' },
        {
          model: InProgressOrders,
          as: 'InProgressOrder',
          attributes: ['status'],
        },
      ],
    });
    if (res) {
      return res.status(200).json({
        msg: `Get Orders Id ${id}`,
        order,
      });
    }
    return order;
  } catch (error) {
    res.status(500).json({
      msg: 'Error Get By Id Order',
      location: 'services/ordersRequests.js/getOrderIdRequest()',
      error,
    });
  }
};
const postOrder = async (date, statusOrder, packageInfo, user, res) => {
  try {
    const newOrderCreate = await Order.create(date);
    await newOrderCreate.setInProgressOrder(statusOrder);
    await newOrderCreate.setPackage(packageInfo);
    await newOrderCreate.setUser(user);
    const createOrder = await getOrderIdRequest(newOrderCreate.id);
    await addPackage(createOrder, res);
    // res.status(201).json({
    //   msg: 'Creation - Order',
    //   createOrder,
    // });
  } catch (error) {
    // res.status(500).json({
    //   msg: 'Error Post Order',
    //   location: 'services/ordersRequests.js/postOrder()',
    //   error,
    // });
  }
};

const canceladoOrder = async (order, statusCancelle = null) => {
  await restPackage(order);
  if (!statusCancelle) {
    const deleteStatus = await searchStatus(status.cancelled);
    await order.setInProgressOrder(deleteStatus);
  } else {
    await order.setInProgressOrder(statusCancelle);
  }
};
const deleteOrderRequest = async (order, res) => {
  try {
    await canceladoOrder(order);
    const updateOrder = await order.update(
      { deleted: true },
      { returning: true },
    );
    res.status(200).json({
      msg: 'Deleted - Order',
      updateOrder,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error delete Order',
      location: 'services/ordersRequests.js/deleteOrderRequest()',
      error,
    });
  }
};

const getOrdersRequest = async (query, res, deleted = false) => {
  try {
    const info = await Order.findAll({
      where: { deleted },
      include: [
        {
          model: InProgressOrders,
          as: 'InProgressOrder',
          attributes: ['status'],
          where: query.status,
        },
        {
          model: Package,
          as: 'Package',
          where: query.idPackage,
        },
      ],
    });
    res.status(200).json({
      msg: 'Get Orders',
      total: info.length,
      info,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error Get Order',
      location: 'services/ordersRequests.js/getOrdersRequest()',
      error,
    });
  }
};

const getOrdersByDay = async (dateInicio, dateFin, deleted = false) => {
  try {
    const info = await Order.findAll({
      where: { deleted },
      include: [
        {
          model: InProgressOrders,
          as: 'InProgressOrder',
          attributes: ['status'],
        },
        {
          model: Package,
          as: 'Package',
          where: {
            createdAt: {
              [Sequelize.Op.between]: [dateInicio, dateFin],
            },
          },
        },
      ],
    });
    const sent = await Order.findAll({
      where: { deleted },
      include: [
        {
          model: InProgressOrders,
          as: 'InProgressOrder',
          attributes: ['status'],
          where: {
            status: 'FINISHED',
          },
        },
        {
          model: Package,
          as: 'Package',
          where: {
            createdAt: {
              [Sequelize.Op.between]: [dateInicio, dateFin],
            },
          },
        },
      ],
    });
    const percentage = (sent.length * 100) / info.length;
    return {
      total: info.length,
      totalSent: sent.length,
      percentage: percentage || 0,
    };
  } catch (error) {
    return {
      msg: 'Error Get Order',
      location: 'services/ordersRequests.js/getOrdersByDay()',
      error,
    };
  }
};

module.exports = {
  getOrdersRequest,
  getOrderIdRequest,
  getOrdersByDay,
  postOrder,
  deleteOrderRequest,
  canceladoOrder,
};
