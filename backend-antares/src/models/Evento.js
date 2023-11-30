const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    dataEvento: {
        type: Date,
        required: true
    }
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = {
    Evento,
    eventoSchema,
}
