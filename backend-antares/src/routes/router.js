const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const vagasRouter = require('./vagas'); 
const feedRouter = require('./feed')
const avaliacaoRouter = require('./avaliacao');

router.use('/', usuariosRouter);
router.use('/', vagasRouter);
router.use('/', feedRouter);
router.use('/', avaliacaoRouter);

module.exports = router;