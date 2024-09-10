const mongoose = require('mongoose');

const estoqueSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true },
  quantidade: { type: Number, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String },
  filtros: { type: [String] }
});

const Estoque = mongoose.model('Estoque', estoqueSchema);
module.exports = Estoque;
