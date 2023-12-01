const { Calendario: CalendarioModel, Calendario } = require('../models/Calendario');
const { Usuario: UsuarioModel } = require('../models/Usuario');

const calendarioController = {
    create: async (req, res) => {
        const eventos = CalendarioModel.find(req.body.login);
        try {
            const verificaLogin = await CalendarioModel.findOne({ login: req.body.login });
            console.log(verificaLogin);
            if (verificaLogin) {
                const eventos = await CalendarioModel.findOne({ login: req.body.login }).select('eventos');
                const newEvento = {
                    titulo: req.body.titulo,
                    dataEvento: Date.now()
                }
                eventos.eventos.push(newEvento);

                const response = await CalendarioModel.findOneAndUpdate({ login: req.body.login }, eventos, { new: true });
                res.status(201).json({ response, message: 'Evento criado com sucesso.' });

            }
            else {
                const newEvento = {
                    login: req.body.login,
                    eventos: { titulo: req.body.titulo, dataEvento: Date.now() }
                };

                const response = await CalendarioModel.create(newEvento);
                res.status(201).json({ response, message: 'Evento criado com sucesso.' });
            }

        } catch (error) {
            console.error('Erro controller calendario\n' + error);
        }
    },

    getAll: async (req, res) => {
        try {
            const eventos = await CalendarioModel.find();
            res.status(200).json({ eventos });
        } catch (error) {
            console.error('Eventos não encontrados \n' + error);
            res.status(500).json({ error: 'Erro ao obter eventos' });
        }
    },

    removerEvento: async (req, res) => {
        try {
            const eventos = await CalendarioModel.findOne({ login: req.body.login });
            const evento = eventos.eventos.filter(evento => evento.titulo == req.body.titulo);

            const response = await CalendarioModel.deleteMany({ 'eventos.titulo': req.body.titulo }).where('eventos.titulo').equals(req.body.titulo);        
                               
            //const response = await CalendarioModel.deleteMany({ login: req.body.login }, evento);

            res.status(200).json({ response, message: 'Evento removido com sucesso.' });

        } catch (error) {
            console.error('Erro ao remover evento \n' + error);
            res.status(500).json({ error: 'Erro ao remover evento' });
        }
    },

};



module.exports = calendarioController;