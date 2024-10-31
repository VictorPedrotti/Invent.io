const Controller = require('./Controller.js');
const ClienteServices = require('../services/ClienteServices.js');

const clienteServices = new ClienteServices();

class ClienteController extends Controller {
  constructor() {
    super(clienteServices);
  }
}

module.exports =  ClienteController;