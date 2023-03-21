const S = require('sequelize');
const sequelize = require('../database/database');

class RecoveryToken extends S.Model {}

RecoveryToken.init(
  {
    token: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'recoveryToken' },
);

module.exports = RecoveryToken;
