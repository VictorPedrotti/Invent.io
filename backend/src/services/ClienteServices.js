const Services = require('./Services.js');

class ClienteServices extends Services {
  constructor(){
    super('Cliente');
  }

  async buscaPedidosPorCliente(id) {
    const pedido = await super.pegaUmRegistroPorId(id);
    const listaPedidos = await pedido.getPedidosCliente();
    return listaPedidos;
  }
}

module.exports = ClienteServices;