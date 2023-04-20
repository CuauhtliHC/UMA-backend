const { response } = require('express');
const StatusUsers = require('../models/statusUser');
const { statusUser } = require('../config/statusUsers.json');

const searchStatusUser = async (status) => {
  try {
    console.log(status);
    console.log(statusUser[status]);
    const statusOrder = await StatusUsers.findOne({
      where: { status: statusUser[status] },
    });
    return statusOrder;
  } catch (error) {
    response.status(404).json({
      title: 'Error Status User',
      msg: `El estado ${status} no se encuentra en la DDBB`,
    });
  }
};

module.exports = searchStatusUser;
