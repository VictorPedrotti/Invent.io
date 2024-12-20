const { Router } = require('express');
const ProdutoController = require('../controllers/ProdutoController');
const { verificaAdmin } = require('../utils/auth');

const produtoController = new ProdutoController();
const router = Router();

router.get('/produtos', (req,res) => produtoController.pegaTodos(req,res));
router.post('/produtos', (req,res) => produtoController.criaNovo(req,res));
router.put('/produtos/:id', verificaAdmin, (req, res) => produtoController.atualiza(req,res));
router.delete('/produtos/:id', verificaAdmin, (req, res) => produtoController.exclui(req,res));

module.exports = router;