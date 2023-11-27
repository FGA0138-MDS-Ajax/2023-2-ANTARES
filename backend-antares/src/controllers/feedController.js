const VagaModel = require('../models/Vagas');

const feedController = {
    getAll: async (req, res) => {
        try {
            const vagas = await VagaModel.find();

            res.status(201).json({vagas});
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter vagas'});
        }
    },
};

module.exports = feedController;