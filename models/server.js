const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/conectBD');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.PackagePath = '/api/Package';
    this.usersPath = '/api/users';
    this.loginPath = '/api/login';
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
    this.app.use(cors()); // da acceso a todos los dominios

    // directorio publico
    // this.app.use(express.static('public'));

    // body parser
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.PackagePath, require('../routes/package'));
    this.app.use(this.usersPath, require('../routes/users'));
    this.app.use(this.loginPath, require('../routes/login'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en port ${this.port}`);
    });
  }
}

module.exports = Server;
