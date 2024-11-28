const { Router } = require('express');
const PedidoController = require('../controllers/PedidoController');
const { verificaAdmin } = require('../utils/auth');

const pedidoController = new PedidoController();
const router = Router();

router.get('/pedidos', (req,res) => pedidoController.pegaTodos(req,res));
router.get('/pedidos/:id', (req,res) => pedidoController.pegaUmPorId(req,res));
router.post('/pedidos', (req,res) => pedidoController.criaNovo(req,res));
router.put('/pedidos/:id', verificaAdmin, (req, res) => pedidoController.atualiza(req,res));
router.delete('/pedidos/:id', verificaAdmin, (req, res) => pedidoController.exclui(req,res));
router.get('/itensPedidos/pedido/:id/', (req, res) => pedidoController.buscaItensPorPedido(req,res));

module.exports = router;