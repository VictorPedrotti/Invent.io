const Controller = require('./Controller.js');
const TransacaoServices = require('../services/TransacaoServices.js');

const transacaoServices = new TransacaoServices();

class TransacaoController extends Controller {
  constructor() {
    super(transacaoServices);
  }
}

module.exports =  TransacaoController;