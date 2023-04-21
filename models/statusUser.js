const S = require('sequelize');
const sequelize = require('../database/database');

class StatusUsers extends S.Model {}

StatusUsers.init(
  {
    status: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'statusUsers' },
);

module.exports = StatusUsers;
