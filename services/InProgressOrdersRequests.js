const { response } = require('express');
const { InProgressOrders } = require('../models');

const searchStatus = async (status) => {
  try {
    const statusOrder = await InProgressOrders.findOne({
      where: { status },
    });
    return statusOrder;
  } catch (error) {
    response.status(404).json({
      title: 'Error Status Order',
      msg: 'El estado Pending no se encuentra en la DDBB',
    });
  }
};

module.exports = searchStatus;
