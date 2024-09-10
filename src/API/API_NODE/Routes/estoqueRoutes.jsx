const express = require('express');
const router = express.Router();
const cors = require ('../cors.jsx');
const authenticate = require('../authenticate.jsx')
require ('passport')
require ('passport-jwt')

const estoqueController = require('../Controllers/estoqueController.jsx');

router.options('/', cors.corsWithOptions, authenticate.verifyUser, estoqueController.corsAuth);
router.get('/', cors.corsWithOptions, authenticate.verifyUser, estoqueController.getEstoque);
router.get('/:id', cors.corsWithOptions, authenticate.verifyUser, estoqueController.getEstoqueById);
router.post('/', cors.corsWithOptions, authenticate.verifyUser, estoqueController.createEstoque);
router.put('/:id', cors.corsWithOptions, authenticate.verifyUser, estoqueController.updateEstoque);
router.delete('/:id', cors.corsWithOptions, authenticate.verifyUser, estoqueController.deleteEstoque);

module.exports = router;
