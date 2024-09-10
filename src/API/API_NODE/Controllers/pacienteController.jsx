const Paciente = require('../Models/pacienteModel.jsx');
const authenticate = require('../authenticate.jsx')
const cors = require ('../cors.jsx');

exports.corsAuth = (req, res) => {res.sendStatus(200);}

exports.getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Erro ao obter pacientes:', error);
    res.status(500).json({ mensagem: 'Erro ao obter pacientes' });
  }
};

exports.getPacienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findById(id);
    if (!paciente) return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    res.status(200).json(paciente);
  } catch (error) {
    console.error(`Erro ao obter paciente com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao obter paciente' });
  }
};

exports.createPaciente = async (req, res) => {
  const dadosPaciente = req.body;
  try {
    const paciente = new Paciente(dadosPaciente);
    await paciente.save();
    res.status(201).json(paciente);
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(400).json({ mensagem: 'Erro ao criar paciente' });
  }
};

exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  try {
    const pacienteAtualizado = await Paciente.findByIdAndUpdate(id, dados, { new: true, runValidators: true });
    if (!pacienteAtualizado) return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    res.status(200).json(pacienteAtualizado);
  } catch (error) {
    console.error(`Erro ao atualizar paciente com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao atualizar paciente' });
  }
};

exports.deletePaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Paciente.findByIdAndDelete(id);
    if (!resultado) return res.status(404).json({ mensagem: 'Paciente não encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error(`Erro ao excluir paciente com ID ${id}:`, error);
    res.status(500).json({ mensagem: 'Erro ao excluir paciente' });
  }
};
