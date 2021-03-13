const { Router } = require('express');
const { check } = require('express-validator');
const { isRoleValide, isEmailExist, isExisteUserId } = require('../helpers/db_validators');
const { validateInputs } = require('../middlewares/validate_inputs');
const { userGet, 
        userPost, 
        userDelete, 
        userPatch, 
        userPut } = require('../controllers/user');


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
        check('id', 'No es un Id Valido').isMongoId(),
        check('id').custom( isExisteUserId ),
        validateInputs
], userDelete );

router.patch('/', userPatch);




module.exports = router;