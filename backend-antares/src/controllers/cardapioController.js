const { Cardapio: CardapioModel } = require('../models/Cardapio');

const cardapioController = {
    atualizaCardapio: async (req, res) => {
        try {
            const cardapio = {
                campus: req.body.campus,
                link: req.body.link,
            };
            // console.log(req.body);
            const response = await CardapioModel.create(cardapio);
      
            res
              .status(201)
              .json({ response, message: "Cardapio criado com sucesso" });
          } catch (error) {
            res
              .status(500)
              .json({ message: "Erro ao criar o cardapio" });
            console.log("Erro controller usuario\n" + error);
          }
    },

    getAll: async (req, res) => {
        try {
            const cardapios = await CardapioModel.find();
            res.status(200).json({cardapios});
        } catch (error) {
            res.status(500).json({ message: "Erro ao obter os cardápios" });
            console.log("Erro controller cardapio\n" + error);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await CardapioModel.findByIdAndDelete(id);
            if (!response) {
                return res.status(404).json({ message: 'Cardapio não encontrado' });
            }
            res.status(200).json({ message: 'Cardapio excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir o cardapio' });
            console.log('Erro controller cardapio\n' + error);
        }
    },
    
    
    
};

module.exports = cardapioController;