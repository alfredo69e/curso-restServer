const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPats = '/api/users';

        // Coonectar a la base de Datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routas de mi app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // Cors
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static( 'public' ) );

    }

    routes() {

        this.app.use( this.usersPats, require('../routes/user'));
       
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor Corriendo en port ${this.port}`);
        });
    }

}

module.exports = Server;