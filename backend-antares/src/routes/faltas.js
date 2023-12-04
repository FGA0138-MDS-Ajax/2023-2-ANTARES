const router = require('express').Router();
const faltasController = require('../controllers/faltasController');

router
    .post('/faltas', faltasController.create)
    .delete('/faltas', faltasController.delete);
module.exports = router;