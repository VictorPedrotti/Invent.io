'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('itens_pedido', [{
      pedido_id: 2,
      produto_id: 1,
      quantidade: 1,
      precoUnitario: 2699.99,
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      pedido_id: 1,
      produto_id: 1,
      quantidade: 1,
      precoUnitario: 2699.99,
      createdAt: new Date(),
      updatedAt: new Date(),
     },], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('itens_pedido', null, {});
  }
};
