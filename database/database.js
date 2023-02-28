const Sequelize = require('sequelize');
const { options } = require('./config.json');
require('dotenv').config();

module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  options,
);
