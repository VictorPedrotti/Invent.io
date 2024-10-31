'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'cliente'
      });
      Pedido.hasMany(models.ItemPedido, {
        foreignKey: 'pedido_id'
      });
      Pedido.hasMany(models.Transacao, {
        foreignKey: 'pedido_id'
      })
    }
  }
  Pedido.init({
    data: DataTypes.DATEONLY,
    status: DataTypes.STRING,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos'
  });
  return Pedido;
};