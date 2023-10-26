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
      const response = await UsuarioModel.find({ login: req.body.login });
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
  resetPassword: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Procura o usuário pelo email no banco de dados
      const usuario = await UsuarioModel.findOne({ email });
      console.log()
      console.log(usuario);
      console.log("senha antiga: " + usuario.senha);
      console.log("senha nova: " + senha);
      // Se o usuário for encontrado
      if (usuario) {
        // Atualiza a senha do usuário
        usuario.senha = senha;
        await usuario.save();

        res.status(200).json({ message: "Senha redefinida com sucesso!" });
      }
       else {
        // Se o usuário não for encontrado
        res
          .status(404)
          .json({ message: "Usuário não encontrado com o email fornecido." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao redefinir a senha." });
      console.error("Erro ao redefinir a senha:", error);
    }
  },
};

module.exports = usuarioController;
