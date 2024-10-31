const Services = require('./Services.js');

class ProdutoServices extends Services {
  constructor(){
    super('Produto');
  }
}

module.exports = ProdutoServices;