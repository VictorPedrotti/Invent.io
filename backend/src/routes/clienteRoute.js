const { Router } = require('express');
const ClienteController = require('../controllers/ClienteController');

const clienteController = new ClienteController();
const router = Router();

router.get('/clientes', (req,res) => clienteController.pegaTodos(req,res));
router.post('/clientes', (req,res) => clienteController.criaNovo(req,res));
router.put('/clientes/:id', (req, res) => clienteController.atualiza(req,res));
router.delete('/clientes/:id', (req, res) => clienteController.exclui(req,res));

module.exports = router;