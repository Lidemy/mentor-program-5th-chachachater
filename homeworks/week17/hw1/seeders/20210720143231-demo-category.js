'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('blog_categories',
    [{
      category: 'test category 1',
    },
    {
      category: 'test category 2',
    },
    {
      category: 'test category 3',
    },
    {
      category: 'test category 4',
    },
    {
      category: 'test category 5',
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
