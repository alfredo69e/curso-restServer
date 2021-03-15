const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT, googleVerify } = require("../helpers");



const login = async (req = request, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar si el Email existe
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                msg: 'Email o Password Incorrectos'
            });
        }

        // Si el usuario esta activo
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'Usuario no Existe'
            });
        }

        // Verifica la contraseña
        const valiatePass = bcryptjs.compareSync( password, user.password );
        if ( !valiatePass ) {
            return res.status(400).json({
                msg: 'Email o Password Incorrectos'
            });
        }

        // Genera el JWT
        const token = await generarJWT( user.id );


        res.json({
            user,
            token
        });
        
    } catch (err) {
        console.log(`login err ${err}`);
        return res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
    


}

const googleSingIn = async(req = request, res = response) => {

    const { id_token } = req.body;
    
    try {
    const { email, img, name } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {
            // Tengo que Crearlo
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
             };

            user = new User( data );
            await user.save({new: true});
        }


        // Si el usuario de base datos 
        if( !user.state ) {
            return res.status(401).json({
                msg: `Usuario Bloqueado`
            });
        }


        // Genera el JWT
        const token = await generarJWT( user.id );
        
        res.json({
            user,
            token
        });
        
    } catch (err) {
        console.log(`googleSingIn err ${err}`);
        return res.status(400).json({
            msg: `Token de google no es Valido`
        });
        
    }


    

}


module.exports = {
    login,
    googleSingIn
}