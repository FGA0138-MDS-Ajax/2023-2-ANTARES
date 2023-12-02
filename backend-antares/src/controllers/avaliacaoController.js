const AvaliacaoModel = require('../models/Avaliacao');
const DisciplinaModel = require('../models/Disciplina');
const { Usuario: UsuarioModel } = require("../models/Usuario");

const avaliacaoController = {
    create: async (req, res) => {
        try {
            const avaliacoes = req.body.avaliacoes;
            const disciplinaCodigo = avaliacoes[0].disciplina_codigo;
            const disciplina = await DisciplinaModel.findOne({ codigo: disciplinaCodigo });
    
            if (!disciplina) {
                return res.status(404).json({ message: 'Disciplina não encontrada.' });
            }
    
            const usuario = await UsuarioModel.findOne({ login: req.body.login_avaliador });
            if (!usuario || ![1, 2].includes(usuario.role)) {
                return res.status(403).json({ message: 'Acesso negado ou usuário não encontrado' });
            }
    
            let professorAtualizado = false;
            for (const avaliacao of avaliacoes) {
                if (!disciplina.professores.includes(avaliacao.professor_nome)) {
                    disciplina.professores.push(avaliacao.professor_nome);
                    professorAtualizado = true;
                }
    
                avaliacao.login_avaliador = req.body.login_avaliador;
                avaliacao.created_at = new Date();
                avaliacao.updated_at = new Date();
                await AvaliacaoModel.create(avaliacao);
            }
    
            if (professorAtualizado) {
                await disciplina.save();
            }
    
            res.status(201).json({ message: 'Avaliações criadas com sucesso.' });
        } catch (error) {
            console.error('Erro ao criar avaliação\n' + error);
            res.status(500).json({ message: 'Erro ao criar avaliação.', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { avaliacaoId, avaliacao } = req.body;
            const usuario = await UsuarioModel.findOne({ login: req.body.login_avaliador });

            if (!usuario || ![1, 2].includes(usuario.role)) {
                return res.status(403).json({ message: 'Acesso negado ou usuário não encontrado' });
            }

            const avaliacaoExistente = await AvaliacaoModel.findById(avaliacaoId);
            if (!avaliacaoExistente) {
                return res.status(404).json({ message: 'Avaliação não encontrada.' });
            }

            if (avaliacaoExistente.login_avaliador !== req.body.login_avaliador) {
                return res.status(403).json({ message: 'Você não tem permissão para editar esta avaliação.' });
            }

            avaliacao.updated_at = new Date();
            await AvaliacaoModel.findByIdAndUpdate(avaliacaoId, avaliacao);

            res.status(200).json({ message: 'Avaliação atualizada com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar avaliação\n' + error);
            res.status(500).json({ message: 'Erro ao atualizar avaliação.', error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { avaliacaoId } = req.body;
            const usuario = await UsuarioModel.findOne({ login: req.body.login_avaliador });

            if (!usuario || ![1, 2].includes(usuario.role)) {
                return res.status(403).json({ message: 'Acesso negado ou usuário não encontrado' });
            }

            const avaliacao = await AvaliacaoModel.findById(avaliacaoId);
            if (!avaliacao) {
                return res.status(404).json({ message: 'Avaliação não encontrada.' });
            }

            if (avaliacao.login_avaliador !== req.body.login_avaliador) {
                return res.status(403).json({ message: 'Você não tem permissão para excluir esta avaliação.' });
            }

            await AvaliacaoModel.findByIdAndDelete(avaliacaoId);

            res.status(200).json({ message: 'Avaliação excluída com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir avaliação\n' + error);
            res.status(500).json({ message: 'Erro ao excluir avaliação.', error: error.message });
        }
    },

    getAvaliacoesMedia: async (req, res) => {
        try {
            const codigoDisciplina = req.params.codigo;
    
            const avaliacoesMedia = await AvaliacaoModel.aggregate([
                {
                    $match: { disciplina_codigo: codigoDisciplina }
                },
                {
                    $group: {
                        _id: {
                            disciplina_codigo: "$disciplina_codigo",
                            professor_nome: "$professor_nome"
                        },
                        mediaDificuldadeDisciplina: { $avg: "$dificuldade_disciplina" },
                        mediaTaxaAprovacao: { $avg: "$taxa_aprovacao" },
                        mediaDificuldadeAvaliacoes: { $avg: "$dificuldade_avaliacoes" },
                        mediaDisponibilidadeProfessor: { $avg: "$disponibilidade_professor" },
                        mediaQuantidadeListasExercicio: { $avg: "$quantidade_listas_exercicio" },
                        mediaQuantidadeProvas: { $avg: "$quantidade_provas" },
                        mediaQuantidadeTrabalhos: { $avg: "$quantidade_trabalhos" }
                    }
                }
            ]);
            res.status(200).json(avaliacoesMedia);
        } catch (error) {
            console.error('Erro ao calcular médias das avaliações\n' + error);
            res.status(500).json({ message: 'Erro ao calcular médias das avaliações.', error: error.message });
        }
    },

    getAvaliacoesPorUsuarioEDisciplina: async (req, res) => {
        try {
            const { login_usuario, disciplina_codigo } = req.params;
            const avaliacoes = await AvaliacaoModel.find({ login_avaliador: login_usuario, disciplina_codigo: disciplina_codigo });
            res.status(200).json(avaliacoes);
        } catch (error) {
            console.error('Erro ao buscar avaliações\n' + error);
            res.status(500).json({ message: 'Erro ao buscar avaliações.', error: error.message });
        }
    },

    getDisciplinaByCodigo: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const disciplina = await DisciplinaModel.findOne({ codigo: codigo });
            res.status(200).json(disciplina);
        } catch (error) {
            console.error('Erro ao buscar disciplina\n' + error);
            res.status(500).json({ message: 'Erro ao buscar disciplina.', error: error.message });
        }
    }, 

    getAllDisciplinas: async (req, res) => {
        try {
            const disciplinas = await DisciplinaModel.find({});
            res.status(200).json(disciplinas);
        } catch (error) {
            console.error('Erro ao buscar disciplinas\n' + error);
            res.status(500).json({ message: 'Erro ao buscar disciplinas.', error: error.message });
        }
    }
};


module.exports = avaliacaoController;
