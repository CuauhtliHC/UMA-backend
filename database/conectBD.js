const db = require('./database');
const {
  creationRolesRequired,
  creationStatusOrdersRequired,
  creationUserAdmin,
  creationUser,
} = require('../services/creationTablesRequired');

const dbConection = async () => {
  try {
    await db.sync({ force: false });
    console.log(`Base de datos conectada ${db.config.database}`);
    await creationRolesRequired();
    await creationStatusOrdersRequired();
    await creationUserAdmin();
    if (db.config.database === 'uma-bbdd-test') {
      await creationUser();
    }
  } catch (error) {
    console.log(error);
    throw new Error('error al conectar a la base de datos');
  }
};
module.exports = {
  dbConection,
};
