const { Router } = require('express');
const FornecedorController = require('../controllers/FornecedorController');
const { verificaAdmin } = require('../utils/auth');

const fornecedorController = new FornecedorController();
const router = Router();

router.get('/fornecedores', (req,res) => fornecedorController.pegaTodos(req,res));
router.post('/fornecedores', (req,res) => fornecedorController.criaNovo(req,res));
router.put('/fornecedores/:id', verificaAdmin, (req, res) => fornecedorController.atualiza(req,res));
router.delete('/fornecedores/:id', verificaAdmin, (req, res) => fornecedorController.exclui(req,res));

module.exports = router;