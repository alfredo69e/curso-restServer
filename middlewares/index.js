const validateInputs = require('./validate-inputs');
const validateJWT = require('./valiate-jwt');
const validateRoles = require('./validate-role');
const validateFiles = require('./validate-file');

module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...validateRoles,
    ...validateFiles
}