const { Router } = require('express');
const { check } = require('express-validator');

const { isRoleValide, isEmailExist, isExisteUserId } = require('../helpers');

const { validateInputs, validateJWT, isAdminRole, tieneRole } = require('../middlewares');

const { userGet, 
        userPost, 
        userDelete, 
        userPatch, 
        userPut } = require('../controllers');


const router = Router();

router.get('/', userGet);

router.post('/create',[
       check('name', 'El Nombre es obligatorio').not().isEmpty(),
       check('password', 'El Password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
       check('email', 'El Correo no es valido').isEmail(),
       check('role').custom( isRoleValide ),
       check('email').custom( isEmailExist ),
       validateInputs

], userPost);

router.put('/update/:id', [
        check('id', 'No es un Id Valido').isMongoId(),
        check('id').custom( isExisteUserId ),
        validateInputs
], userPut);

router.delete('/delete/:id', [
        validateJWT,
        // isAdminRole,
        tieneRole( 'ADMIN_ROLE', 'SELL_ROLE' ),
        check('id', 'No es un Id Valido').isMongoId(),
        check('id').custom( isExisteUserId ),
        validateInputs
], userDelete );

router.patch('/', userPatch);




module.exports = router;