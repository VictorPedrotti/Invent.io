const { Router } = require('express');
const ClienteController = require('../controllers/ClienteController');
const { verificaAdmin } = require('../utils/auth');

const clienteController = new ClienteController();
const router = Router();

router.get('/clientes', (req,res) => clienteController.pegaTodos(req,res));
router.post('/clientes', (req,res) => clienteController.criaNovo(req,res));
router.put('/clientes/:id', verificaAdmin, (req, res) => clienteController.atualiza(req,res));
router.delete('/clientes/:id', verificaAdmin, (req, res) => clienteController.exclui(req,res));
router.get('/clientes/:id/pedidos', (req, res) => clienteController.buscaPedidosPorCliente(req,res));

module.exports = router;