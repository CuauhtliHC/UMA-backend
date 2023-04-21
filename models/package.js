const { Model } = require('sequelize');
const S = require('sequelize');
const sequelize = require('../database/database');

class Package extends Model {}
Package.init(
  {
    address: {
      type: S.STRING,
      allowNull: false,
    },
    addresses: {
      type: S.STRING,
      allowNull: false,
    },
    weight: {
      type: S.FLOAT,
      allowNull: false,
    },
    dateOfDelivery: {
      type: S.DATE,
      allowNull: false,
    },
    quantityOfPackages: {
      type: S.INTEGER,
      allowNull: false,
    },
    quantityInOrders: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    deleted: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'package' },
);

module.exports = Package;
