const router = require('express').Router();
const vagasController = require('../controllers/vagasController');

router.post('/vagas', vagasController.create);

module.exports = router;
