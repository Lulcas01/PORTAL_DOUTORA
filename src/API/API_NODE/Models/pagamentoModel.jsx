const mongoose = require('mongoose');

const pagamentoSchema = new mongoose.Schema({
  valorTotal: { type: Number, required: true },
  parcela: { type: Number, required: true },
  metodo: { type: String, required: true },
  idConsulta: { type: mongoose.Schema.Types.ObjectId, ref: 'Consulta', required: true }
});

const Pagamento = mongoose.model('Pagamento', pagamentoSchema);
module.exports = Pagamento;
