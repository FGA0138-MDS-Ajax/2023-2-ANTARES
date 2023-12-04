const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardapioSchema = new Schema({
    campus: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});

const Cardapio = mongoose.model('Cardapio', cardapioSchema);
module.exports = Cardapio;

module.exports = {
    Cardapio,
    cardapioSchema,
}