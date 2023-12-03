const {Admin: AdminModel} = require('../models/Admin');

const adminController = {
    registrarLog: async (titulo, descricao, icon) => {
        try {
            const logRegistro = {
                titulo,
                descricao,
                icon,
                horaRegistro: new Date()
            };

            console.log("Log criado:\n" + JSON.stringify(logRegistro));
            const response = await AdminModel.create(logRegistro);
            return { response, message: "Log registrado com sucesso." };
        } catch (error) {
            throw { error, message: "Erro ao cadastrar Log." };
        }
    },
    getAllLogs: async (_req, res) => {
        try {
            const logs = await AdminModel.find();
            res.status(200).json({ logs, message: "Logs encontrados com sucesso." });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar logs.", error: error.message });
        }
    }
};



module.exports = adminController;