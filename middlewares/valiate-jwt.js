
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: `No hay Token en la peticion`
        });
    }

    // Validar Token
    try {

       const { uid }  = jwt.verify(token, process.env.SECRETPRIVATEKEY);
       // console.log(payload);

       const user = await User.findById( uid );

       if ( !user ) {
            return res.status(401).json({
                msg: `Token no Valido`
            });
       }

       // Verificar si el state esta en true
       if ( !user.state ) {
            return res.status(401).json({
                msg: `Token no Valido`
            });
       }

        req.user = user;

        next();
        
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: `Token no Valido`
        });
        
    }

}



module.exports = {
    validateJWT
}