const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const vagasRouter = require('./vagas'); 

router.use('/', usuariosRouter);
router.use('/', vagasRouter);

module.exports = router;