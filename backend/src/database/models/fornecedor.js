'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fornecedor extends Model {
    static associate(models) {
      Fornecedor.hasMany(models.Produto, {
        foreignKey: 'fornecedor_id'
      })
    }
  }
  Fornecedor.init({
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    contato: DataTypes.STRING,
    endereco: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fornecedor',
    tableName: 'fornecedores'
  });
  return Fornecedor;
};