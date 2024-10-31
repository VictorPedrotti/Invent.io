'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transacao extends Model {
    static associate(models) {
      Transacao.belongsTo(models.Produto, {
        foreignKey: 'produto_id',
        as: 'produto'
      });
      Transacao.belongsTo(models.Pedido, {
        foreignKey: 'pedido_id',
        as: 'pedido'
      })  
    }
  }
  Transacao.init({
    data: DataTypes.DATEONLY,
    tipo: DataTypes.STRING,
    valor: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Transacao',
    tableName: 'transacoes'
  });
  return Transacao;
};