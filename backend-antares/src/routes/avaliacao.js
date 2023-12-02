const router = require('express').Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router
    .route('/avaliacao')
    .post((req, res) => avaliacaoController.create(req, res))
    .put((req, res) => avaliacaoController.update(req, res))
    .delete((req, res) => avaliacaoController.delete(req, res));

router
    .get('/disciplinas', (req, res) => avaliacaoController.getAllDisciplinas(req, res));

router
    .get('/avaliacoes/media', (req, res) => avaliacaoController.getAvaliacoesMedia(req, res));

router
    .get('/avaliacoes/usuario/:login_usuario/disciplina/:disciplina_codigo', (req, res) => avaliacaoController.getAvaliacoesPorUsuarioEDisciplina(req, res));

module.exports = router;