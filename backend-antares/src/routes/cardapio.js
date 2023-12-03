const router = require('express').Router();
const cardapioController = require('../controllers/cardapioController');

router
    .route('/cardapio')
    .post((req, res) => cardapioController.atualizaCardapio(req, res))
router
    .route('/getCardapio')
    .post((req, res) => cardapioController.getAll(req, res))
    
module.exports = router;