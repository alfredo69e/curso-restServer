const express = require('express');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPats = '/api/users';

        // Middlewares
        this.middlewares();

        // Routas de mi app
        this.routes();
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