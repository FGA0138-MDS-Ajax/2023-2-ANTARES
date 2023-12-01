const router = require('express').Router();
const calendarioController = require('../controllers/calendarioController');

router
    .route('/calendario')
    .post((req, res) => calendarioController.create(req, res))
    .get((req, res) => calendarioController.getAll(req, res))
    .delete((req, res) => calendarioController.removerEvento(req, res))
module.exports = router;