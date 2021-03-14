const { Router } = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');

const { login } = require('../controllers/auth');


const router = Router();


router.post('/login',[
    check('email', 'El Email es Obligatorio').isEmail(),
    check('password', 'El Password es Obligatorio').not().isEmpty(),
    validateInputs
], login );


module.exports = router;