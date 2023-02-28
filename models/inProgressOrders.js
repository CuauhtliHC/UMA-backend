const S = require('sequelize');
const sequelize = require('../database/database');

class InProgressOrders extends S.Model {}

InProgressOrders.init(
  {
    status: {
      type: S.STRING,
      defaultValue: 'pending',
    },
  },
  { sequelize, modelName: 'inProgressOrders' },
);

module.exports = InProgressOrders;
