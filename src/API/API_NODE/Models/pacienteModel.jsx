const mongoose = require('mongoose');


const pacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String },
  cpf: { type: String },
  endereco: { type: String },
  cidade: { type: String },
  alergias: { type: [String] },
  responsavel: { type: String },
  medicacoes: { type: [String] },
  cirurgias: { type: [String] }
});


const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
