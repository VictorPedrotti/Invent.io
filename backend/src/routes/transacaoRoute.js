const { Router } = require('express');
const TransacaoController = require('../controllers/TransacaoController');
const { verificaAdmin } = require('../utils/auth');

const transacaoController = new TransacaoController();
const router = Router();

router.get('/transacoes', (req,res) => transacaoController.pegaTodos(req,res));
router.post('/transacoes', (req,res) => transacaoController.criaNovo(req,res));
router.put('/transacoes/:id', verificaAdmin, (req, res) => transacaoController.atualiza(req,res));
router.delete('/transacoes/:id', verificaAdmin, (req, res) => transacaoController.exclui(req,res));

module.exports = router;