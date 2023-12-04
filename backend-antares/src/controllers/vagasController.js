const VagaModel = require('../models/Vagas');
const { Usuario: UsuarioModel } = require('../models/Usuario');
const adminController = require('./adminController');

const vagaController = {
    create: async (req, res) => {
        try {
            const vaga = {
                criador: req.body.criador,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                role: req.body.role,
                user_image: req.body.user_image,
                contato: req.body.contato,
                link: req.body.link,
                dataEncerramento: req.body.dataEncerramento
            };

            const usuario = await UsuarioModel.findOne({ criador: vaga.criador });

            const response = await VagaModel.create(vaga);

            res.status(201).json({ response, message: 'Vaga criada com sucesso.' });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(err => err.message);
                res.status(400).json({ message: 'Erro de validação', errors: messages });
            } else {
                res.status(500).json({ message: 'Erro ao criar a vaga.', error: error.message });
            }

            console.error('Erro controller vaga\n' + error);
        } finally {
            let textoTitulo = "Publicação de " + req.body.role
            let textoDescricao = "O usuário " + req.body.criador + " publicou uma vaga no sistema."
            let icon = "post_add"
            try {
                const logResponse = await adminController.registrarLog(textoTitulo, textoDescricao, icon);
                console.log(logResponse.message);
            } catch (logError) {
                console.log("Erro ao registrar log:\n" + logError);
            }
        }
    },

    deleteExpired: async () => {
        try {
            const now = new Date();
            const result = await VagaModel.deleteMany({ dataEncerramento: { $lt: now } });

            console.log(`Vagas expiradas excluídas: ${result.deletedCount}`);
        } catch (error) {
            console.error('Erro ao excluir vagas expiradas\n' + error);
        }
    },

    deleteOne: async (req, res) => {
        try {
            const vaga = await VagaModel.findById(req.body.id);
            console.log(req.body)
            console.log(vaga);
            if (!vaga) {
                res.status(404).json({ message: 'Vaga não encontrada.' });
                return;
            }
    
            const response = await VagaModel.findByIdAndDelete(req.body.id);

            if (!response) {
                res.status(404).json({ message: 'Vaga não encontrada.' });
                return;
            }
    
            res.status(200).json({ message: 'Vaga excluída com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir a vaga.', error: error.message });
            console.error('Erro controller vaga\n', error);
        }
    },

    getAll: async (req, res) => {
        try {
            const response = await VagaModel.find();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar vagas.', error: error.message });
            console.error('Erro controller vaga\n', error);
        }
    },

};

module.exports = vagaController;
