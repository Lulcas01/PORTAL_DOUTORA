const express = require('express');
const router = express.Router();
const cors = require ('../cors.jsx');

const consultaController = require('../Controllers/consultaController.jsx');

router.options('/', cors.corsWithOptions, consultaController.corsAuth);
router.get('/', cors.corsWithOptions, consultaController.getConsultas);
router.get('/:id', cors.corsWithOptions, consultaController.getConsultaById);
router.post('/', cors.corsWithOptions, consultaController.createConsulta);
router.put('/:id', cors.corsWithOptions, consultaController.updateConsulta);
router.delete('/:id', cors.corsWithOptions, consultaController.deleteConsulta);

module.exports = router;
