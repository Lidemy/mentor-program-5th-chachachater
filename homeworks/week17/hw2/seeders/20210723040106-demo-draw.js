'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('draw_apis', [{
      name: '圖片1',
      description: '今天會下雨',
      photo_link: 'https://image.flaticon.com/icons/png/512/4968/4968394.png',
      weight: 1
    }, {
      name: '圖片2',
        description: '今天是陰天',
        photo_link: 'https://image.flaticon.com/icons/png/512/4968/4968458.png',
        weight: 1
      }, {
        name: '圖片3',
        description: '寒流來襲',
        photo_link: 'https://image.flaticon.com/icons/png/512/4968/4968508.png',
        weight: 1
      }, {
        name: '圖片4',
        description: '小心午後雷陣雨',
        photo_link: 'https://image.flaticon.com/icons/png/512/4968/4968471.png',
        weight: 1
      }, {
        name: '圖片5',
        description: '颱風天',
        photo_link: 'https://image.flaticon.com/icons/png/512/4968/4968601.png',
        weight: 1
      }
  ], {});
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
