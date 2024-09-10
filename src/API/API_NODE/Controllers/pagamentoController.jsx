const Pagamento = require('../Models/pagamentoModel.jsx');
const authenticate = require('../authenticate.jsx')
const cors = require ('../cors.jsx');

exports.corsAuth = (req, res) => {res.sendStatus(200);}

exports.getPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find();
    res.status(200).json(pagamentos);
  } catch (error) {
    console.error('Erro ao obter pagamentos:', error);
    res.status(500).json({ mensagem: 'Erro ao obter pagamentos' });
  }
};

exports.getPagamentoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pagamento = await Pagamento.findById(id);
    if (!pagamento) return res.status(404).json({ mensagem: 'Pagamento não encontrado' });
    res.status(200).json(pagamento);
  } catch (error) {
    console.error(`Erro ao obter pagamento com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao obter pagamento' });
  }
};

exports.createPagamento = async (req, res) => {
  const dadosPagamento = req.body;
  try {
    const pagamento = new Pagamento(dadosPagamento);
    await pagamento.save();
    res.status(201).json(pagamento);
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(400).json({ mensagem: 'Erro ao criar pagamento' });
  }
};

exports.updatePagamento = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  try {
    const pagamentoAtualizado = await Pagamento.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
    if (!pagamentoAtualizado) return res.status(404).json({ mensagem: 'Pagamento não encontrado' });
    res.status(200).json(pagamentoAtualizado);
  } catch (error) {
    console.error(`Erro ao atualizar pagamento com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao atualizar pagamento' });
  }
};

exports.deletePagamento = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Pagamento.findByIdAndDelete(id);
    if (!resultado) return res.status(404).json({ mensagem: 'Pagamento não encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error(`Erro ao excluir pagamento com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao excluir pagamento' });
  }
};
