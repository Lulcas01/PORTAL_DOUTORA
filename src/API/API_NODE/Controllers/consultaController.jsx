const Consulta = require('../Models/consultaModel.jsx');
const authenticate = require('../authenticate.jsx')
const cors = require ('../cors.jsx');

exports.corsAuth = (req, res) => {res.sendStatus(200);}

exports.getConsultas = async (req, res) => {
  try {
    const consultas = await Consulta.find();
    res.status(200).json(consultas);
  } catch (error) {
    console.error('Erro ao obter consultas:', error);
    res.status(500).json({ mensagem: 'Erro ao obter consultas' });
  }
};

exports.getConsultaById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await Consulta.findById(id);
    if (!consulta) return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    res.status(200).json(consulta);
  } catch (error) {
    console.error(`Erro ao obter consulta com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao obter consulta' });
  }
};

exports.createConsulta = async (req, res) => {
  const dadosConsulta = req.body;
  try {
    const consulta = new Consulta(dadosConsulta);
    await consulta.save();
    res.status(201).json(consulta);
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    res.status(400).json({ mensagem: 'Erro ao criar consulta' });
  }
};

exports.updateConsulta = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  try {
    const consultaAtualizada = await Consulta.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
    if (!consultaAtualizada) return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    res.status(200).json(consultaAtualizada);
  } catch (error) {
    console.error(`Erro ao atualizar consulta com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao atualizar consulta' });
  }
};

exports.deleteConsulta = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Consulta.findByIdAndDelete(id);
    if (!resultado) return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    res.status(204).send();
  } catch (error) {
    console.error(`Erro ao excluir consulta com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao excluir consulta' });
  }
};