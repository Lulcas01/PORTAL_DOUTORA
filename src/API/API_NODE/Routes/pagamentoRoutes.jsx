const express = require('express');
const router = express.Router();
const cors = require ('../cors.jsx');

const pagamentoController = require('../Controllers/pagamentoController.jsx');

router.options('/', cors.corsWithOptions, pagamentoController.corsAuth);
router.get('/', cors.corsWithOptions,  pagamentoController.getPagamentos);
router.get('/:id', cors.corsWithOptions, pagamentoController.getPagamentoById);
router.post('/', cors.corsWithOptions,  pagamentoController.createPagamento);
router.put('/:id', cors.corsWithOptions,  pagamentoController.updatePagamento);
router.delete('/:id', cors.corsWithOptions,  pagamentoController.deletePagamento);

module.exports = router;
