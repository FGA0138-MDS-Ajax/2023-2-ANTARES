const router = require('express').Router()

const usuarioController = require('../controllers/usuarioController');

router
    .route('/usuarios')
    .post((req, res) => usuarioController.create(req, res))
    .put((req,res) => usuarioController.resetPassword(req,res))
    
router
    .route('/login')
    .post((req,res) => usuarioController.validaUsuario(req,res))
module.exports = router