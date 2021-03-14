require('dotenv').config();

const Server = require('./class/server');


const server = new Server();

server.listen();

