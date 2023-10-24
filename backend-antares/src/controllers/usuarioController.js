const { Usuario: UsuarioModel } = require("../models/Usuario");

const usuarioController = {
  create: async (req, res) => {
    try {
      const usuario = {
        login: req.body.login,
        senha: req.body.senha,
        telefone: req.body.telefone,
        email: req.body.email,
        user_image: req.body.user_image,
        role: req.body.role,
      };

      console.log(req.body);
      const response = await UsuarioModel.create(usuario);

      res
        .status(201)
        .json({ response, message: "Usuário Registrado com Sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Login, Email ou Telefone Já Cadastrado no Sistema" });
      console.log("Erro controller usuario\n" + error);
    }
  },
  getUsuario: async (req, res) => {
    try {
      console.log(req.body);
      const response = await UsuarioModel.find({login:req.body.login})
      res.status(201).json({
        message: "Login Efetuado com Sucesso!",
        response,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Credenciais Não Encontradas no Sistema!" });
      console.log(error);
    }
  },
};

module.exports = usuarioController;
