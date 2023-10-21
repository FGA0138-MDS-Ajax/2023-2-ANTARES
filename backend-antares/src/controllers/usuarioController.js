const { Usuario: UsuarioModel } = require('../models/Usuario')

const usuarioController = {
    create: async(req, res) =>{
        try {
            const usuario = {
                login: req.body.login,
                senha: req.body.senha,
                email: req.body.email,
                user_image: req.body.user_image,
                role: req.body.role
            }

            console.log(req.body)
            const response = await UsuarioModel.create(usuario)

            res.status(201).json({ response, message: 'Usuário Registrado com Sucesso' })
            
        } catch(error) {
            console.log('Erro controller usuario' + error)
        }
    }
}

module.exports = usuarioController