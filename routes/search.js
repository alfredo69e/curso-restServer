const { Router } = require('express');

const { search } = require('../controllers');

const router = Router();

router.get('/:colection/:finish', search );


module.exports = router;