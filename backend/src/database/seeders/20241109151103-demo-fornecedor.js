'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fornecedores', [
      {
        nome: 'Nova Era Eletrônicos',
        cnpj: '12.345.678/0001-99',
        contato: '(11) 98765-4321',
        endereco: 'Rua Progresso, 567',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Tech Solutions',
        cnpj: '23.456.789/0002-88',
        contato: '(47) 3221-5678',
        endereco: 'Avenida da Tecnologia, 123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Digital World',
        cnpj: '56.789.012/0004-55',
        contato: '(21) 2567-8910',
        endereco: 'Avenida Principal, 1234',
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fornecedores', null, {});
  }
};
