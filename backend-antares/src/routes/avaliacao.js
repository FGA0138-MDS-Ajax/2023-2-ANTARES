const router = require('express').Router();
const avaliacaoController = require('../controllers/avaliacaoController');

// Rotas para avaliações gerais
router.route('/avaliacao')
    .post(avaliacaoController.create)
    .put(avaliacaoController.update)
    .delete(avaliacaoController.delete);

// Rotas para disciplinas
router.get('/disciplinas', avaliacaoController.getAllDisciplinas);
router.get('/disciplina/:codigo', avaliacaoController.getDisciplinaByCodigo);
router.get('/disciplina/:codigo/avaliacoes-media', avaliacaoController.getAvaliacoesMedia);

// Rotas para avaliações de usuários
router.get('/avaliacoes/usuario/:login_usuario/disciplina/:disciplina_codigo', avaliacaoController.getAvaliacoesPorUsuarioEDisciplina);
router.get('/avaliacoes/count/:matricula/:disciplina', avaliacaoController.getAvaliacoesUsuarioCount);

// Rotas para avaliações dos professores
router.get('/avaliacoes/professores/:disciplina', avaliacaoController.getAvaliacoesProfessores);

module.exports = router;
