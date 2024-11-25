const express = require('express');
const usuarios = require('./usuarioRoute.js');
const produtos = require('./produtoRoute.js');
const clientes =  require('./clienteRoute.js');
const fornecedores = require('./fornecedorRoutes.js');
const pedidos = require('./pedidoRoute.js');
const itensPedidos = require('./itemPedidoRoute.js');
const transacoes = require('./transacaoRoute.js');
const { validaAutenticacao } = require('../utils/auth.js');

module.exports = app => {
  app.use(express.json());
  app.use(usuarios)
  app.use(validaAutenticacao);
  app.use(
    produtos,
    clientes,
    fornecedores,
    pedidos,
    itensPedidos,
    transacoes
  )
};