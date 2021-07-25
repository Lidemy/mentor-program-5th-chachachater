'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('blog_articles', 
    [{
      title: 'test title 1',
      content: '1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest',
      category_id: 1,
    },
    {
      title: 'test title 2',
      content: '2testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest',
      category_id: 2,
    },
    {
      title: 'test title 3',
      content: '3testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest',
      category_id: 3,
    },
    {
      title: 'test title 4',
      content: '4testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest',
      category_id: 4,
    },
    {
      title: 'test title 5',
      content: '5testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest1testtesttesttesttesttesttesttesttesttesttest',
      category_id: 5,
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
