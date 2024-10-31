const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const usuarioController = new UsuarioController();
const router = Router();

router.get('/login', (req,res) => usuarioController.loginUsuario(req, res));
router.post('/signup', (req, res) => usuarioController.criaNovo(req, res));

module.exports = router;