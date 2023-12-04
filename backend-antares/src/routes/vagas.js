const router = require('express').Router();
const vagasController = require('../controllers/vagasController');

router
    .post('/vagas', vagasController.create)
    .delete('/vagas', vagasController.deleteOne)
    .get('/vagas', vagasController.getAll)

module.exports = router;
