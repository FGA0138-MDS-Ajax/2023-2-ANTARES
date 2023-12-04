const mongoose = require('mongoose');
const { Schema } = mongoose;

const DisciplinaModel = new Schema({
    nome: {type: String, required: true},
    codigo: {type: String, required: true, unique: true},
    carga_horaria: {type: String, required: true},
    pre_requisitos: [String],
    equivalencia: [String],
    tranca: [String],
    avaliacoes_professores: [{ type: Schema.Types.ObjectId, ref: 'Avaliacao' }],
    professores: [{type: String, unique: true}],
});

const Disciplina = mongoose.model('Disciplina', DisciplinaModel, 'disciplina');
module.exports = Disciplina;