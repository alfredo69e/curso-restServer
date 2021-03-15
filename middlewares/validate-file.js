

const { request, response } = require('express');

const validateFiles = ( req = request, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir.'
        });
    }

    next();

}

module.exports = {
    validateFiles
}