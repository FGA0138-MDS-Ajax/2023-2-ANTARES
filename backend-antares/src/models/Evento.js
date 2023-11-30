const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventoSchema = new Schema({
    criadorEmail: {
        type: String,
        required: true,
        ref: 'Usuario'
    },
    titulo: {
        type: String,
        required: true
    },
    dataEvento: {
        type: Date,
        default: () => new Date(Date.now())
    }
});

const Evento = mongoose.model('Evento', eventoSchema);
module.exports = Evento;
