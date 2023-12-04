const { Faltas: FaltasModel } = require("../models/Faltas");

const faltasController = {
    create: async (req, res) => {
      try {
        if (!req.body.matricula || !req.body.materia || !req.body.horas || isNaN(req.body.horas)) {
          res.status(400).json({ message: "Campos inválidos. Certifique-se de que todos os campos estão preenchidos corretamente." });
          return;
        }
  
        const faltas = {
          matricula: req.body.matricula,
          materia: req.body.materia,
          horas: req.body.horas,
          faltasTotais: Math.floor((req.body.horas * 0.25) / 2),
        };
  
        const response = await FaltasModel.create(faltas);
        console.log(response);
  
        res.status(201).json({ response, message: "Matéria criada com sucesso." });
      } catch (error) {
        res.status(500).json({ message: "Erro ao criar a matéria.", error: error.message });
      }
    },
  
    delete: async (req, res) => {
      try {
        if (!req.body.materia) {
          res.status(400).json({ message: "Campo 'materia' é obrigatório." });
          return;
        }
  
        const response = await FaltasModel.deleteOne({
          materia: req.body.materia,
        });
  
        res.status(200).json({ response, message: "Matéria deletada." });
      } catch (error) {
        res.status(500).json({ message: "Erro ao deletar a matéria.", error: error.message });
      }
    },
  };
  
module.exports = faltasController;
