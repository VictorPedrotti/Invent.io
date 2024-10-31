'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('itens_pedido', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      precoUnitario: {
        type: Sequelize.DECIMAL
      },
      pedido_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'pedidos', key: 'id'}
      },
      produto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'produtos', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('itens_pedido');
  }
};