const db = require('./database');

const dbConection = async () => {
  try {
    await db.sync({ force: false });
    console.log(`Base de datos conectada ${db.config.database}`);
    // await creationRolesRequired();
    // await creationStatusOrdersRequired();
    // await creationUserAdmin();
    // if (db.config.database === process.env.DATABASE_TEST) {
    //   await creationUser();
    // }
  } catch (error) {
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
