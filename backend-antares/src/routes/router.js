const router = require('express').Router()

const usuariosRouter = require('./usuarios')

router.use('/', usuariosRouter)

module.exports = router