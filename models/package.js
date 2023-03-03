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
      type: S.DECIMAL,
      allowNull: false,
    },
    deleted: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'Package' },
);

module.exports = Package;
