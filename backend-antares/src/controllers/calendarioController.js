const {Calendario: CalendarioModel } = require('../models/Calendario');
const { Usuario: UsuarioModel } = require('../models/Usuario');

const calendarioController = {
    create: async (req, res) => {
        try {
            const verificaEvento = await CalendarioModel.findOne({ login: req.body.login });
            if(!verificaEvento){
                const evento = {
                    login: req.body.login,
                    titulo: req.body.titulo,
                    dataEvento: req.body.dataEvento[0]
                };
                const response = await CalendarioModel.create(evento);
                res.status(201).json({response, message: 'Evento criado com sucesso.' });
            }
            // const usuario = await UsuarioModel.findOne({ email: vaga.criadorEmail });
            // if (!usuario || ![1, 3, 4, 5].includes(usuario.role)) {
            //     return res.status(403).json({ message: 'Acesso negado ou usuário não encontrado' });
            // }
            
            // const response = await EventoModel.create(evento);

            

        } catch (error) {
            console.error('Erro controller calendario\n' + error);
        }
    },

    getAll: async(req, res) => {
        try {
            const eventos = await EventoModel.find()
            res.status(200).json({ eventos });
        } catch (error) {
            console.error('Eventos não encontrados \n' + error);
            res.status(500).json({ error: 'Erro ao obter eventos' });
        }
    }

};



module.exports = calendarioController;