const bcrypt = require('bcrypt');
const { Usuario: UsuarioModel } = require("../models/Usuario");

const usuarioController = {
  create: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      const usuario = {
        nome: req.body.nome,
        login: req.body.login,
        senha: hashedPassword,
        telefone: req.body.telefone,
        email: req.body.email,
        user_image: req.body.user_image,
        role: req.body.role,
      };

      // console.log(req.body);
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
  validaUsuario: async (req, res) => {
    try {
      // console.log(req.body);
      const usuario = await UsuarioModel.findOne({ login: req.body.login });
      if (usuario && await bcrypt.compare(req.body.senha, usuario.senha)) {
        res.status(201).json({
          message: "Login Efetuado com Sucesso!",
          response: usuario
      });
      } else {
        res.status(200).json({
          message: "Credenciais Não Encontradas no Sistema",
        })
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro na requisição com o banco." });
      console.log(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Procura o usuário pelo email no banco de dados
      const usuario = await UsuarioModel.findOne({ email });
      // Se o usuário for encontrado
      if (usuario) {
        // Atualiza a senha do usuário
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);
        usuario.senha = hashedPassword;
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
