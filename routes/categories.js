const { Router } = require('express');

const { check } = require('express-validator');

const { categories,
        categoriesCreate,
        categoriesSearch,
        categoriesDetele,
        categoriesUpdate } = require('../controllers');

const { isExisteCategorieId } = require('../helpers');

const { validateInputs, validateJWT } = require('../middlewares');

const router = Router();

router.get('/',[ validateJWT ], categories );

// Optener Categoria por id
router.get('/:id',[
    validateJWT,
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom( isExisteCategorieId ),
    validateInputs
], categoriesSearch );

// Crear Categoria
router.post('/create',[ 
    validateJWT,
    check('name', 'El Nombre es Obligatorio').not().isEmpty(),
    validateInputs,
], categoriesCreate );


// Update Categoria por id
router.put('/:id',[
    validateJWT,
    check('name', 'El Nombre es Obligatorio').not().isEmpty(),
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom( isExisteCategorieId ),
    validateInputs
], categoriesUpdate );

// Delete Categoria por id solo si es un admnin
router.delete('/:id',[
    validateJWT,
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom( isExisteCategorieId ),
    validateInputs
], categoriesDetele );



module.exports = router;