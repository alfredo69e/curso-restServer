
const googleVerify = require('./google-verify');
const validator = require('./db_validators');
const encryptarPass = require('./encryptar-pass');
const generarJWT = require('./generate-jwt');

module.exports = {
    ...validator,
    ...googleVerify,
    ...encryptarPass,
    ...generarJWT
}