const mongoose = require('mongoose')

const { Schema } = mongoose

const usuarioSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    telefone:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    user_image:{
        type: String,
        required: false
    },
    role: {
        type: Number,
        required: true
    },
    },
    { timestamps: true }

)
usuarioSchema.index({ login: 1, email: 1, telefone: 1 }, { unique: true });
const Usuario = mongoose.model('Usuario', usuarioSchema)


module.exports = {
    Usuario,
    usuarioSchema,
}