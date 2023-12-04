const { Calendario: CalendarioModel} = require('../models/Calendario');

const calendarioController = {
    create: async (req, res) => {
        function converteStringParaDate(dataString) {
            const [datePart, timePart] = dataString.split(' ');
            const [day, month, year] = datePart.split('-');
            const [hours, minutes, seconds] = timePart.split(':');
            const data = new Date(year, month - 1, day, (Number(hours) + 3).toString(), minutes, seconds);
            return data;
        }

        try {
            const verificaLogin = await CalendarioModel.findOne({ login: req.body.login });

            if (verificaLogin) {
                const eventos = await CalendarioModel.findOne({ login: req.body.login }).select('eventos');
                const newEvento = {
                    titulo: req.body.titulo,
                    dataEvento: converteStringParaDate(req.body.dataEvento)
                }
                eventos.eventos.push(newEvento);

                const response = await CalendarioModel.findOneAndUpdate({ login: req.body.login }, eventos, { new: true });
                res.status(201).json({ response, message: 'Evento criado com sucesso.' });

            }
            else {
                const newEvento = {
                    login: req.body.login,
                    eventos: { titulo: req.body.titulo, dataEvento: converteStringParaDate(req.body.dataEvento) }
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
            console.log(req.body.login);
            const calendario = await CalendarioModel.findOne({login: req.body.login});
            res.status(200).json({ calendario });
        } catch (error) {
            console.error('Eventos não encontrados \n' + error);
            res.status(500).json({ error: 'Erro ao obter eventos' });
        }
    },

    getDay: async (req, res) => {
        try {
            const calendario = await CalendarioModel.findOne({login: req.body.login});
            console.log(calendario);
            const eventosDia = calendario.eventos.filter(evento => evento.dataEvento == req.body.dataEvento);
            console.log(eventosDia);
            console.log(req.body.dataEvento);

            res.status(200).json({ calendario });
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