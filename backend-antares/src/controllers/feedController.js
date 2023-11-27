const VagaModel = require('../models/Vagas');

const feedController = {
    getAll: async (req, res) => {
        try {
            const numPagina = req.body.numPagina || 0;
            const porPagina = 15;

            // Consulta para obter as vagas na página atual
            const vagas = await VagaModel.find()
                .sort({ dataPublicacao: -1 })
                .skip(numPagina * porPagina)
                .limit(porPagina);

            // Consulta para obter o número total de vagas
            const totalVagas = await VagaModel.countDocuments();

            // Calcula o número total de páginas
            const totalPages = Math.ceil(totalVagas / porPagina);

            // Retorna o resultado com totalPages e totalVagas
            res.status(200).json({ vagas, totalPages, totalVagas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter vagas' });
        }
    },
};



module.exports = feedController;