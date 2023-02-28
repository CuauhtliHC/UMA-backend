const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/conectBD');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
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
    // this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en port ${this.port}`);
    });
  }
}

module.exports = Server;

// app.use((err, req, res) => {
//   console.log('ERROR');
//   console.log(err);
//   res.status(500).send(err.message);
// });

// app.listen(3001, () => console.log('Servidor escuchando en el puerto 3001'));