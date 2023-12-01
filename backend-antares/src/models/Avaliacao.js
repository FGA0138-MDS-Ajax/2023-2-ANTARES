const mongoose = require('mongoose');
const { Schema } = mongoose;

const avaliacaoSchema = new Schema({
    login_avaliador: { type: String, required: true },
    disciplina_codigo: {type: String, required: true, ref: 'Disciplina'},
    professor_nome: {type: String, required: true},
    dificuldade_disciplina: {type: Number, required: true},
    taxa_aprovacao: {type: Number, required: true},
    dificuldade_avaliacoes: {type: Number, required: true},
    disponibilidade_professor: {type: Number, required: true},
    quantidade_listas_exercicio: {type: Number, required: true},
    quantidade_provas: {type: Number, required: true},
    quantidade_trabalhos: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

const Avaliacao = mongoose.model('avaliacao', avaliacaoSchema, 'avaliacao');
module.exports = Avaliacao;

