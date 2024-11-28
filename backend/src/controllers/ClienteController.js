const Controller = require('./Controller.js');
const ClienteServices = require('../services/ClienteServices.js');

const clienteServices = new ClienteServices();

class ClienteController extends Controller {
  constructor() {
    super(clienteServices);
  }

  async buscaPedidosPorCliente(req, res) {
    try {
      const { id } = req.params;
      const listaPedidos = await clienteServices.buscaPedidosPorCliente(Number(id));
      return res.status(200).json(listaPedidos);
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
  }
}

module.exports =  ClienteController;