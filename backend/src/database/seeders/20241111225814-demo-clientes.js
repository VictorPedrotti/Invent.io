'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [{
      nome: 'João da Silva',
      cpf_cnpj: '123.456.789-10',
      contato: '(11) 98765-4321',
      endereco: 'Rua das Flores, 123, Jardim Paulista',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nome: 'Empresa XYZ LTDA',
      cpf_cnpj: '12.345.678/0001-99',
      contato: '(11) 3456-7890',
      endereco: 'Avenida Brasil, 456, Centro',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nome: 'Maria Santos',
      cpf_cnpj: '987.654.321-87',
      contato: 'maria@email.com',
      endereco: 'Rua Nova, 789, Vila Mariana',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});

  }
};
