const S = require('sequelize');
const sequelize = require('../database/database');

class SwornStatement extends S.Model {}

SwornStatement.init(
  {
    bodyText: {
      type: S.TEXT,
      allowNull: null,
    },
    aceppt: {
      type: S.BOOLEAN,
      allowNull: null,
    },
  },
  {
    sequelize,
    modelName: 'SwornStatement',
  },
);

module.exports = SwornStatement;
