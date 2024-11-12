const { Router } = require('express');
const PedidoController = require('../controllers/PedidoController');

const pedidoController = new PedidoController();
const router = Router();

router.get('/pedidos', (req,res) => pedidoController.pegaTodos(req,res));
router.post('/pedidos', (req,res) => pedidoController.criaNovo(req,res));
router.put('/pedidos/:id', (req, res) => pedidoController.atualiza(req,res));
router.delete('/pedidos/:id', (req, res) => pedidoController.exclui(req,res));

module.exports = router;