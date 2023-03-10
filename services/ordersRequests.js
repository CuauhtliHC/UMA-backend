const { Order, InProgressOrders, Package } = require('../models');
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
    console.log(orderPackage.Package.quantityInOrders);
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
    const order = await Order.findByPk(id, { include: 'Package' });
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
const postOrder = async (date, statusOrder, packageInfo, res) => {
  try {
    const newOrderCreate = await Order.create(date);
    await newOrderCreate.setInProgressOrder(statusOrder);
    await newOrderCreate.setPackage(packageInfo);
    const createOrder = await getOrderIdRequest(newOrderCreate.id);
    await addPackage(createOrder, res);
    res.status(201).json({
      msg: 'Creation - Order',
      createOrder,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error Post Order',
      location: 'services/ordersRequests.js/postOrder()',
      error,
    });
  }
};

const putOrderPackage = async (data, orderPackage, res) => {
  try {
    await restPackage(orderPackage, res);
    const updateOrder = await orderPackage.update(data, { returning: true });
    await addPackage(updateOrder, res);
    res.status(200).json({
      msg: 'Update - Order',
      updateOrder,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error Put Order',
      location: 'services/ordersRequests.js/putOrderPackage()',
      error,
    });
  }
};
const deleteOrderRequest = async (order, res) => {
  try {
    const updateOrder = await order.update(
      { deleted: true },
      { returning: true },
    );
    await restPackage(updateOrder);
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

module.exports = {
  getOrdersRequest,
  getOrderIdRequest,
  postOrder,
  putOrderPackage,
  deleteOrderRequest,
};
