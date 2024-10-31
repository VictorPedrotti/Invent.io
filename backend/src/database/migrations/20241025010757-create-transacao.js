'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data: {
        type: Sequelize.DATEONLY
      },
      tipo: {
        type: Sequelize.STRING
      },
      valor: {
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
    await queryInterface.dropTable('transacoes');
  }
};