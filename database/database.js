const Sequelize = require('sequelize');
const { options } = require('./config.json');
require('dotenv').config();

const {
  DATABASE, USER, PASSWORD, DATABASE_TEST, NODE_ENV,
} = process.env;

module.exports = new Sequelize(
  NODE_ENV === 'test' ? DATABASE_TEST : DATABASE,
  USER,
  PASSWORD,
  options,
);
