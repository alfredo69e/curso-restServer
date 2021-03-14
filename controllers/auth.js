const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generate-jwt");



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
        console.log(err);
        return res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
    


}


module.exports = {
    login
}