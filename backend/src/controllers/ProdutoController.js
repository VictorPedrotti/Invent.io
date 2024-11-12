const Controller = require('./Controller.js');
const ProdutoServices = require('../services/ProdutoServices.js');

const produtoServices = new ProdutoServices();

class ProdutoController extends Controller {
  constructor() {
    super(produtoServices);
  }
}

module.exports =  ProdutoController;