const Services = require('./Services.js');

class PedidoServices extends Services {
  constructor(){
    super('Pedido');
  }

  async buscaItensPorPedido(id) {
    const pedido = await super.pegaUmRegistroPorId(id);
    const listaItensPedido = await pedido.getItensPedido();
    return listaItensPedido;
  }
}

module.exports = PedidoServices;