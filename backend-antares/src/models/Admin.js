const mongoose = require('mongoose')

const { Schema } = mongoose

const adminSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    icon:{
        type: String,
        required: true,
    },
    horaRegistro: {
        type: Date,
        required: true,
    }
    },
    { timestamps: true }

)
const Admin = mongoose.model('Admin', adminSchema)


module.exports = {
    Admin,
    adminSchema,
}