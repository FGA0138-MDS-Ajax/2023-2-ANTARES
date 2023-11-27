const VagaModel = require('../models/Vagas');
const { Usuario: UsuarioModel } = require('../models/Usuario');

const vagaController = {
    create: async (req, res) => {
        try {
            const vaga = {
                criadorEmail: req.body.criadorEmail,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                contato: req.body.contato,
                link: req.body.link,
                dataEncerramento: req.body.dataEncerramento
            };

            const usuario = await UsuarioModel.findOne({ email: vaga.criadorEmail });
            if (!usuario || ![1, 3, 4, 5].includes(usuario.role)) {
                return res.status(403).json({ message: 'Acesso negado ou usuário não encontrado' });
            }

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
    }
};

module.exports = vagaController;
