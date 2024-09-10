const Estoque = require('../Models/estoqueModel.jsx');
const authenticate = require('../authenticate.jsx')
const cors = require ('../cors.jsx');

exports.corsAuth = (req, res) => {res.sendStatus(200);}

exports.getEstoque = async (req, res) => {
  try {
    const estoque = await Estoque.find();
    res.status(200).json(estoque);
  } catch (error) {
    console.error('Erro ao obter estoque:', error);
    res.status(500).json({ mensagem: 'Erro ao obter estoque' });
  }
};

exports.getEstoqueById = async (req, res) => {
  const { id } = req.params;
  try {
    const itemEstoque = await Estoque.findById(id);
    if (!itemEstoque) return res.status(404).json({ mensagem: 'Item de estoque não encontrado' });
    res.status(200).json(itemEstoque);
  } catch (error) {
    console.error(`Erro ao obter item de estoque com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao obter item de estoque' });
  }
};

exports.createEstoque = async (req, res) => {
  console.log('Dados recebidos para criar:', req.body);

  const dadosEstoque = { ...req.body };
  delete dadosEstoque.id;

  try {
    const novoItemEstoque = new Estoque(dadosEstoque);
    await novoItemEstoque.save();
    res.status(201).json(novoItemEstoque);
  } catch (error) {
    console.error('Erro ao criar item de estoque:', error);
    res.status(400).json({ mensagem: 'Erro ao criar item de estoque' });
  }
};


exports.updateEstoque = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const itemEstoque = await Estoque.findByIdAndUpdate(id, dadosAtualizados, { new: true, runValidators: true });
    if (!itemEstoque) return res.status(404).json({ mensagem: 'Item de estoque não encontrado' });
    res.status(200).json(itemEstoque);
  } catch (error) {
    console.error(`Erro ao atualizar item de estoque com ID ${id}:`, error);
    res.status(400).json({ mensagem: 'Erro ao atualizar item de estoque' });
  }
};

exports.deleteEstoque = async (req, res) => {
  const { id } = req.params;
  try {
    const itemEstoque = await Estoque.findByIdAndDelete(id);
    if (!itemEstoque) return res.status(404).json({ mensagem: 'Item de estoque não encontrado' });
    res.status(204).send(); // No content
  } catch (error) {
    console.error(`Erro ao deletar item de estoque com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao deletar item de estoque' });
  }
};
