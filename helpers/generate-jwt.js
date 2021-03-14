
const jwt = require('jsonwebtoken');

const generarJWT = async ( uid = '' ) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn: '15 days',
        }, (err, token) => {

            if (err) {
                console.log(`generarJWT err ${err}`);
               return reject('no se pudo generar el token');
            }

            return resolve(token);


        });

    });

}

module.exports = {
    generarJWT
}