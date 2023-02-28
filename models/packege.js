const { Model } = require('sequelize');
const S = require('sequelize');
const sequelize = require('../database/database');

class Packege extends Model {}
Packege.init(
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
      type: S.INET,
      defaultValue: 1,
    },
    deleted: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'packege' },
);

module.exports = Packege;
