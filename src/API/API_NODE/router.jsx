const express = require('express');
const router = express.Router();
const pacienteRoutes = require('./Routes/pacienteRoutes.jsx');
const pagamentoRoutes = require('./Routes/pagamentoRoutes.jsx');
const estoqueRoutes = require('./Routes/estoqueRoutes.jsx');
const consultaRoutes = require('./Routes/consultaRoutes.jsx');
const userRoutes = require('./Routes/userRoutes.jsx');
require ('./authenticate.jsx')

router.use('/api/pacientes', pacienteRoutes);
router.use('/api/pagamentos', pagamentoRoutes);
router.use('/api/estoque', estoqueRoutes);
router.use('/api/consulta', consultaRoutes);
router.use('/api/user', userRoutes);

module.exports = router;
