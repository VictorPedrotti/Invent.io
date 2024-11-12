const Controller = require('./Controller.js');
const PedidoServices = require('../services/PedidoServices.js');

const pedidoServices = new PedidoServices();

class PedidoController extends Controller {
  constructor() {
    super(pedidoServices);
  }
}

module.exports =  PedidoController;