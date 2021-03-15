
const { Router } = require('express');
const { check } = require('express-validator');
const { upload, showImg, uploadUpdateCloudinary } = require('../controllers');
const { validateJWT, validateInputs, validateFiles } = require('../middlewares');
const { colectionPermitidas } = require('../helpers');

const router = Router();

router.post('/',[
    validateJWT,
    validateFiles,
], upload );

router.put('/:colection/:id',[
    validateJWT,
    validateFiles,
    check('id', 'No es un Id Valido').isMongoId(),
    check('colection').custom( colection => colectionPermitidas( colection, [ 'users', 'products' ] ) ),
    validateInputs
], uploadUpdateCloudinary );
// ], uploadUpdate );

router.get('/:colection/:id', [
    validateJWT,
    check('id', 'No es un Id Valido').isMongoId(),
    validateInputs
], showImg )

module.exports = router;