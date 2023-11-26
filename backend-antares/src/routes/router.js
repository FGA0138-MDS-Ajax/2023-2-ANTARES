const router = require('express').Router();

const usuariosRouter = require('./usuarios');
const vagasRouter = require('./vagas'); 
const feedRouter = require('./feed')

router.use('/', usuariosRouter);
router.use('/', vagasRouter);
router.use('/', feedRouter);

module.exports = router;