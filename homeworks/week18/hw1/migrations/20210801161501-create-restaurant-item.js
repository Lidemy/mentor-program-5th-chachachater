'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurant_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        unique: true,
        type: Sequelize.STRING
      },
      price: {
        defaultValue: null,
        type: Sequelize.INTEGER
      },
      on_sale: {
        defaultValue: 0,
        type: Sequelize.BOOLEAN
      },
      id_hash: {
        defaultValue: null,
        type: Sequelize.STRING
      },
      delete_hash: {
        defaultValue: null,
        type: Sequelize.STRING
      },
      link: {
        defaultValue: null,
        type: Sequelize.STRING
      },
      createdAt: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Restaurant_items');
  }
};