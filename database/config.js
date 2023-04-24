require('dotenv').config();

const {
  DB_HOST,
} = process.env;

module.exports = {
  options: {
    dialect: 'postgres',
    host: DB_HOST,
    port: 5432,
    logging: false,
  },
};
