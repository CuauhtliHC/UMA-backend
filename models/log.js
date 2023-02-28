const S = require('sequelize');
const sequelize = require('../database/database');

class Log extends S.Model {}
Log.init(
  {
    description: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'log' },
);

module.exports = Log;
