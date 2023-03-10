const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { dbConection } = require('../database/conectBD');
const {
  creationRolesRequired,
  creationStatusOrdersRequired,
  creationUserAdmin,
} = require('../services/creationTablesRequired');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.PackagePath = '/api/package';
    this.usersPath = '/api/users';
    this.loginPath = '/api/login';
    this.ordersPath = '/api/orders';
    this.logoutPath = '/api/logout';
    this.conectarDB(); // conecta a la base de datos
    this.middLewares(); // controla antes de la llegada al servidor

    this.routes(); // rutas
    this.creationTables();
  }

  async conectarDB() {
    await dbConection();
  }

  async creationTables() {
    await creationRolesRequired();
    await creationStatusOrdersRequired();
    await creationUserAdmin();
  }

  // middlewares
  middLewares() {
    // cors
    this.app.use(cors()); // da acceso a todos los dominios

    // directorio publico
    // this.app.use(express.static('public'));

    // body parser
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  routes() {
    this.app.use(this.PackagePath, require('../routes/package'));
    this.app.use(this.usersPath, require('../routes/users'));
    this.app.use(this.loginPath, require('../routes/login'));
    this.app.use(this.ordersPath, require('../routes/orders'));
    this.app.use(this.logoutPath, require('../routes/logout'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en port ${this.port}`);
    });
  }
}

module.exports = Server;
