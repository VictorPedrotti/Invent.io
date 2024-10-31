'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      Produto.belongsTo(models.Fornecedor, {
        foreignKey: 'fornecedor_id',
        as: 'fornecedor'
      });
      Produto.hasMany(models.ItemPedido, {
        foreignKey: 'produto_id'
      });
      Produto.hasMany(models.Transacao, {
        foreignKey: 'produto_id'  
      })
    }
  }
  Produto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.DECIMAL,
    quantidade: DataTypes.INTEGER,
    imagem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'produtos'
  });
  return Produto;
};