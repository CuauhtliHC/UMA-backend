const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { dbConection } = require('../database/conectBD');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.packagePath = '/api/package';
    this.usersPath = '/api/users';
    this.loginPath = '/api/login';
    this.ordersPath = '/api/orders';
    this.ordersAndPackagesPath = '/api/ordersAndPackages';
    this.logoutPath = '/api/logout';
    this.swornStatementPath = '/api/swornStatement';
    this.conectarDB(); // conecta a la base de datos
    this.middLewares(); // controla antes de la llegada al servidor

    this.routes(); // rutas
  }

  async conectarDB() {
    await dbConection();
  }

  // middlewares
  middLewares() {
    // cors
    this.app.use(
      cors(),
    ); // da acceso a todos los dominios

    // directorio publico
    // this.app.use(express.static('public'));

    // body parser
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  routes() {
    this.app.use(this.packagePath, require('../routes/package'));
    this.app.use(this.usersPath, require('../routes/users'));
    this.app.use(this.loginPath, require('../routes/login'));
    this.app.use(this.ordersPath, require('../routes/orders'));
    this.app.use(
      this.ordersAndPackagesPath,
      require('../routes/packageAndOrders'),
    );
    this.app.use(this.logoutPath, require('../routes/logout'));
    this.app.use(this.swornStatementPath, require('../routes/swornStatement'));
  }

  listen() {
    this.serverListen = this.app.listen(this.port, () => {
      console.log(`Escuchando en port ${this.port}`);
    });
  }
}

module.exports = Server;
