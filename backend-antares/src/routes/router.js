const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const vagasRouter = require('./vagas'); 
const feedRouter = require('./feed')
const adminRouter = require('./admin')
const cardapioRouter = require('./cardapio');

router.use('/', usuariosRouter);
router.use('/', vagasRouter);
router.use('/', feedRouter);
router.use('/', adminRouter);
router.use('/', cardapioRouter);

module.exports = router;