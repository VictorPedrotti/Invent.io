const { Router } = require('express');
const ItemPedidoController = require('../controllers/ItemPedidoController');
const { verificaAdmin } = require('../utils/auth');

const itemPedidoController = new ItemPedidoController();
const router = Router();

router.get('/itensPedidos', (req,res) => itemPedidoController.pegaTodos(req,res));
router.post('/itensPedidos', (req,res) => itemPedidoController.criaNovo(req,res));
router.put('/itensPedidos/:id', verificaAdmin, (req, res) => itemPedidoController.atualiza(req,res));
router.delete('/itensPedidos/:id', verificaAdmin, (req, res) => itemPedidoController.exclui(req,res));

module.exports = router;