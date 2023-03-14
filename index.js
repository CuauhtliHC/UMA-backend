const Server = require('./models/server');

require('dotenv').config();

const server = new Server();

const puertoOpen = server.listen();

module.exports = { server, puertoOpen };
