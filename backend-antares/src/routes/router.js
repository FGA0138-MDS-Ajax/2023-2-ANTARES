const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const vagasRouter = require('./vagas'); 
const feedRouter = require('./feed')
const adminRouter = require('./admin')
const avaliacaoRouter = require('./avaliacao');

router.use('/', usuariosRouter);
router.use('/', vagasRouter);
router.use('/', feedRouter);
router.use('/', adminRouter);
router.use('/', avaliacaoRouter);

module.exports = router;