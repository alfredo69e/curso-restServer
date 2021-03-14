const validateInputs = require('../middlewares/validate-inputs');
const validateJWT = require('../middlewares/valiate-jwt');
const validateRoles = require('../middlewares/validate-role');

module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...validateRoles
}