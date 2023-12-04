const mongoose = require('mongoose');
const { Schema } = mongoose;
const {Evento: EventoModel, Evento} = require('../models/Evento');

const calendarioSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    eventos: [Evento.schema]
    
});

const Calendario = mongoose.model('Calendario', calendarioSchema);

module.exports = {
    Calendario,
    calendarioSchema,
}
