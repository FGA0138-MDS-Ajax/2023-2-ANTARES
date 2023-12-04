const mongoose = require("mongoose");

const { Schema } = mongoose;

const faltasSchema = new Schema({
  matricula: {
    type: String,
    required: true,
  },
  materia: {
    type: String,
    required: true,
  },
  horas: {
    type: Number,
    required: true,
  },
  faltas: {
    type: Number,
    required: true,
  },
});
const Faltas = mongoose.model("Faltas", faltasSchema);

module.exports = {
  Faltas,
  faltasSchema,
};
