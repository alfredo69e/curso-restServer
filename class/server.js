const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users       : '/api/users',
            auth        : '/api/auth',
            categories  : '/api/categories',
            products    : '/api/products',
            search      : '/api/search',
            upload      : '/api/upload',
        }

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

        // Carga de Archivos 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));

    }

    routes() {

        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.users, require('../routes/user'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.products, require('../routes/products'));
        this.app.use( this.paths.search, require('../routes/search'));
        this.app.use( this.paths.upload, require('../routes/upload'));
       
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor Corriendo en port ${this.port}`);
        });
    }

}

module.exports = Server;