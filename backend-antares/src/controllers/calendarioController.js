const EventoModel = require('../models/Evento');
const { Usuario: UsuarioModel } = require('../models/Usuario');

const calendarioController = {
    create: async (req, res) => {
        try {
            const evento = {
                criadorEmail: req.body.criadorEmail,
                titulo: req.body.titulo,
                dataEvento: req.body.dataEncerramento
            }

            const usuario = await UsuarioModel.findOne({ email: vaga.criadorEmail });
            if (!usuario || ![1, 3, 4, 5].includes(usuario.role)) {
                return res.status(403).json({ message: 'Acesso negado ou usuário não encontrado' });
            }
            
            const response = await EventoModel.create(evento);

            res.status(201).json({ response, message: 'Evento criado com sucesso.' });

        } catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(err => err.message);
                res.status(400).json({ message: 'Erro de validação', errors: messages });
            } else {
                res.status(500).json({ message: 'Erro ao criar o evento.', error: error.message });
            }

            console.error('Erro controller calendario\n' + error);
        }
    }

};



module.exports = calendarioController;