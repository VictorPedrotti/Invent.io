'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemPedido extends Model {
    static associate(models) {
      ItemPedido.belongsTo(models.Pedido, {
        foreignKey: 'pedido_id',
        as: 'pedido'
      });
      ItemPedido.belongsTo(models.Produto, {
        foreignKey: 'produto_id',
        as: 'produto'
      })  
    }
  }
  ItemPedido.init({
    quantidade: DataTypes.INTEGER,
    precoUnitario: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ItemPedido',
    tableName: 'itens_pedido'
  });
  return ItemPedido;
};