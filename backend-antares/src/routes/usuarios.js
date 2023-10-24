const router = require('express').Router()

const usuarioController = require('../controllers/usuarioController');

router
    .route('/usuarios')
    .post((req, res) => usuarioController.create(req, res))
    .get((req,res) => usuarioController.getUsuario(req,res))

module.exports = router