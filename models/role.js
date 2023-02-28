const S = require('sequelize');
const sequelize = require('../database/database');

class Role extends S.Model {}

Role.init(
  {
    rol: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'role' },
);

module.exports = Role;
