const bcrypt = require('bcrypt');
const { Usuario: UsuarioModel } = require("../models/Usuario");
const adminController = require('./adminController');


const usuarioController = {
  create: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.senha, salt);
      const usuario = {
        nome: req.body.nome,
        matricula: req.body.matricula,
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
    }  finally {
      let textoTitulo = "Cadastro de " + req.body.role
      let textoDescricao = "O usuário " + req.body.nome + " [ @" + req.body.matricula + " ] " + " foi cadastrado no sistema."
      let icon = "group_add"
      try {
          const logResponse = await adminController.registrarLog(textoTitulo, textoDescricao, icon);
          console.log(logResponse.message);
      } catch (logError) {
          console.log("Erro ao registrar log:\n" + logError);
      }
  }
  },
  validaUsuario: async (req, res) => {
    try {
      const usuario = await UsuarioModel.findOne({ matricula: req.body.matricula });
      // console.log(req.body);
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
      const { email, senha, user_image } = req.body;

      // Procura o usuário pelo email no banco de dados
      const usuario = await UsuarioModel.findOne({ email });
      // Se o usuário for encontrado
      if (usuario) {
        // Atualiza a senha do usuário
        if(senha){
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(senha, salt);
          usuario.senha = hashedPassword;
        }
        usuario.user_image = user_image ? user_image : usuario.user_image;
        await usuario.save();
        res.status(200).json({ message: "Pefil atualizado com sucesso." });
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
    }  finally {
      try {
        let textoTitulo = "Atualização de Perfil"
        let textoDescricao = "O usuário " + req.body.email + " atualizou sua " + (req.body.senha ? "senha" : "foto de perfil" + ".")
        let icon = req.body.senha ? "lock" : "photo_camera"
        const logResponse = await adminController.registrarLog(textoTitulo, textoDescricao, icon);
        console.log(logResponse.message);
      } catch (logError) {
          console.log("Erro ao registrar log:\n" + logError);
      }
  }
  },
};

module.exports = usuarioController;
