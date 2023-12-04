const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const vagasRouter = require('./vagas'); 
const feedRouter = require('./feed')
const adminRouter = require('./admin')
const cardapioRouter = require('./cardapio');
const avaliacaoRouter = require('./avaliacao');
const calendarioRouter = require('./calendario')
const faltasRouter = require('./faltas')

router.use('/', usuariosRouter);
router.use('/', vagasRouter);
router.use('/', feedRouter);
router.use('/', adminRouter);
router.use('/', cardapioRouter);
router.use('/', avaliacaoRouter);
router.use('/', calendarioRouter)
router.use('/', faltasRouter);

module.exports = router;