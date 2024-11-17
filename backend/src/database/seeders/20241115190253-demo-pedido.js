'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('pedidos', [{
      data: '17-04-2024',
      status: 'Concluído',
      total: 2699.99,
      cliente_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
     },
    {
      data: '25-06-2024',
      status: 'Pendente',
      total: 6489.99,
      cliente_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),  
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pedidos', null, {});
  }
};
