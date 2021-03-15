const { Router } = require('express');

const { check } = require('express-validator');

const { productCreate, products, productId, productUpdate, productDelete } = require('../controllers');

const { isExistProductId, isExisteCategorieId } = require('../helpers');

const { validateInputs, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

router.post('/create',[
    validateJWT,
    check('name', 'El Nombre es Obligatorio').not().isEmpty(),
    check('categorie', 'No es un Id Valido').isMongoId(),
    check('categorie').custom( isExisteCategorieId ),
    validateInputs,
], productCreate );

router.get('/',[
    validateJWT,
], products );

router.get('/:id',[
    validateJWT,
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom( isExistProductId ),
    validateInputs
], productId );

router.put('/:id',[
    validateJWT,
    // check('categorie', 'No es un Id Valido').isMongoId(),
    check('id').custom( isExistProductId ),
    validateInputs

], productUpdate );

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom( isExistProductId ),
    validateInputs

], productDelete );


module.exports = router