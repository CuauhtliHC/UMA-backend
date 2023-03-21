const S = require('sequelize');
const sequelize = require('../database/database');

class SwornStatement extends S.Model {}

SwornStatement.init(
  {
    aceppt: {
      type: Boolean,
      allowNull: null,
    },
  },
  {
    sequelize,
    modelName: 'Sworn_Statements',
  },
);

module.exports = SwornStatement;
