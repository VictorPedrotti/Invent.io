const Controller = require('./Controller.js');
const ItemPedidoServices = require('../services/ItemPedidoServices.js');

const itemPedidoServices = new ItemPedidoServices();

class ItemPedidoController extends Controller {
  constructor() {
    super(itemPedidoServices);
  }
}

module.exports =  ItemPedidoController;