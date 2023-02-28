const S = require('sequelize');
const sequelize = require('../database/database');

class Order extends S.Model {}
Order.init(
  {
    quantity: {
      type: S.STRING,
      allowNull: false,
    },
    deleted: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'order' },
);

module.exports = Order;
