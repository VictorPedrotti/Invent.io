const Controller = require('./Controller.js');
const PedidoServices = require('../services/PedidoServices.js');

const pedidoServices = new PedidoServices();

class PedidoController extends Controller {
  constructor() {
    super(pedidoServices);
  }

  async buscaItensPorPedido(req, res) {
    try {
      const { id } = req.params;
      const listaItensPedido = await pedidoServices.buscaItensPorPedido(Number(id));
      return res.status(200).json(listaItensPedido);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports =  PedidoController;