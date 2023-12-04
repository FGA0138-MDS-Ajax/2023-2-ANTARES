const mongoose = require("mongoose");

const { Schema } = mongoose;

const faltasSchema = new Schema({
  materia: {
    type: String,
    required: true,
  },
  horas: {
    type: Number,
    required: true,
  },
  faltasTotais: {
    type: Number,
    required: true,
  },
});
const Faltas = mongoose.model("Faltas", faltasSchema);

module.exports = {
  Faltas,
  faltasSchema,
};
