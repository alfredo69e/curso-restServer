const bcrypt = require('bcryptjs');

const encodePass = async ( password ) => {
     // Encryptar la Contraseña
     const salt = bcrypt.genSaltSync();
     return bcrypt.hashSync(password, salt);
}

const decodePass = async (  password  ) => {
    // Encryptar la Contraseña
   
}

module.exports = {
    encodePass,
    decodePass
}