const express = require('express');
const router = express.Router();
const cors = require ('../cors.jsx');

const pacienteController = require('../Controllers/pacienteController.jsx');

router.options('/', cors.corsWithOptions, pacienteController.corsAuth);
router.get('/', cors.corsWithOptions, pacienteController.getPacientes);
router.get('/:id', cors.corsWithOptions, pacienteController.getPacienteById);
router.post('/', cors.corsWithOptions, pacienteController.createPaciente);
router.put('/:id', cors.corsWithOptions, pacienteController.updatePaciente);
router.delete('/:id', cors.corsWithOptions, pacienteController.deletePaciente);

module.exports = router;
