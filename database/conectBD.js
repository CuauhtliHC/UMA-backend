const db = require('./database');

const dbConection = async () => {
  try {
    await db.sync({ force: false });
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(error);
    throw new Error('error al conectar a la base de datos');
  }
};
module.exports = {
  dbConection,
};
