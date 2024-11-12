const express = require('express');
const usuarios = require('./usuarioRoute.js');
const produtos = require('./produtoRoute.js');
const clientes =  require('./clienteRoute.js');
const fornecedores = require('./fornecedorRoutes.js');
const pedidos = require('./pedidoRoute.js');
const itensPedidos = require('./itemPedidoRoute.js');
const transacoes = require('./transacaoRoute.js');

module.exports = app => {
  app.use(
    express.json(),
    usuarios,
    produtos,
    clientes,
    fornecedores,
    pedidos,
    itensPedidos,
    transacoes
  );
};