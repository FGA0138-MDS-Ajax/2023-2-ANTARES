const { Calendario: CalendarioModel } = require("../models/Calendario");
const { findByIdAndDelete, deleteOne } = require("../models/Vagas");

const calendarioController = {
  create: async (req, res) => {
    const eventos = CalendarioModel.find(req.body.login);
    try {
      const verificaLogin = await CalendarioModel.findOne({
        login: req.body.login,
      });
      console.log(verificaLogin);
      if (verificaLogin) {
        const eventos = await CalendarioModel.findOne({
          login: req.body.login,
        }).select("eventos");
        const newEvento = {
          titulo: req.body.titulo,
          dataEvento: Date.now(),
        };
        eventos.eventos.push(newEvento);

        const response = await CalendarioModel.findOneAndUpdate(
          { login: req.body.login },
          eventos,
          { new: true }
        );
        res
          .status(201)
          .json({ response, message: "Evento criado com sucesso." });
      } else {
        const newEvento = {
          login: req.body.login,
          eventos: { titulo: req.body.titulo, dataEvento: Date.now() },
        };

        const response = await CalendarioModel.create(newEvento);
        res
          .status(201)
          .json({ response, message: "Evento criado com sucesso." });
      }
    } catch (error) {
      console.error("Erro controller calendario\n" + error);
    }
  },

  getAll: async (req, res) => {
    try {
      console.log(req.body.login);
      const calendario = await CalendarioModel.findOne({
        login: req.body.login,
      });
      res.status(200).json({ calendario });
    } catch (error) {
      console.error("Eventos não encontrados \n" + error);
      res.status(500).json({ error: "Erro ao obter eventos" });
    }
  },

  getDay: async (req, res) => {
    try {
      const calendario = await CalendarioModel.findOne({
        login: req.body.login,
      });
      console.log(calendario);
      const eventosDia = calendario.eventos.filter(
        (evento) => evento.dataEvento == req.body.dataEvento
      );
      console.log(eventosDia);
      console.log(req.body.dataEvento);

      res.status(200).json({ calendario });
    } catch (error) {
      console.error("Eventos não encontrados \n" + error);
      res.status(500).json({ error: "Erro ao obter eventos" });
    }
  },

  delete: async (req, res) => {
    try {
      const response = await CalendarioModel.updateOne(
        { login: req.body.login },
        {
          $pull: {
            eventos: { titulo: req.body.titulo }
          }
        }
      );
  
      if (response.modifiedCount === 0) {
        res.status(404).json({ message: "Evento não encontrado." });
        return;
      }
  
      res.status(200).json({ response, message: "Evento deletado." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao deletar o Evento.", error: error.message });
    }
  },
  
};
module.exports = calendarioController;
