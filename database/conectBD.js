const db = require('./database');
require('dotenv').config();

const {
  DATABASE, USER, PASSWORD,
} = process.env;

const dbConection = async () => {
  try {
    await db.sync({ force: false });
    console.log(`Base de datos conectada ${db.config.database}`);
  } catch (error) {
    console.log(DATABASE, USER, PASSWORD);
    console.log(error);
    throw new Error('error al conectar a la base de datos');
  }
};
const dbClose = async () => {
  try {
    await db.close();
    console.log('Base de Dato cerrada');
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  dbConection,
  dbClose,
};
