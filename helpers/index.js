
const googleVerify = require('./google-verify');
const validator = require('./db_validators');
const encryptarPass = require('./encryptar-pass');
const generarJWT = require('./generate-jwt');
const uploads = require('./uploads');

module.exports = {
    ...validator,
    ...googleVerify,
    ...encryptarPass,
    ...generarJWT,
    ...uploads,
}