const mongoose = require('mongoose');
const { Schema } = mongoose;
const {Evento: EventoModel} = require('../models/Evento');

const calendarioSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    titulo: {
        type: [String],
        required: true,
        ref: EventoModel
    },
    dataEvento: {
        type: [Date],
        required: true,
        ref: EventoModel
    }
    
});

const Calendario = mongoose.model('Calendario', calendarioSchema);

module.exports = {
    Calendario,
    calendarioSchema,
}
