const { Router } = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');

const { login, googleSingIn } = require('../controllers');


const router = Router();


router.post('/login',[
    check('email', 'El Email es Obligatorio').isEmail(),
    check('password', 'El Password es Obligatorio').not().isEmpty(),
    validateInputs
], login );


router.post('/google',[
    check('id_token', 'EL ID token es necesario').not().isEmpty(),
    validateInputs
], googleSingIn );

module.exports = router;