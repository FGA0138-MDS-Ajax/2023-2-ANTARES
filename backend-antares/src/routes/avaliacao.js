const router = require('express').Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router
    .route('/avaliacao')
    .post((req, res) => avaliacaoController.create(req, res))
    .put((req, res) => avaliacaoController.update(req, res))
    .delete((req, res) => avaliacaoController.delete(req, res));

module.exports = router;