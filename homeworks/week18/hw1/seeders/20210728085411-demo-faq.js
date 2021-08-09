'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Restaurant_faqs', [
      {
      title: '如何辦理退貨？',
      content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque!',
      order: 2
    },
      {
        title: '目前提供哪些付款方式？',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque!',
        order: 3
      },
      {
        title: '線上刷卡如何操作呢？',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque!',
        order: 4
      },
      {
        title: '如何查詢目前訂單的處理情況？',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque!',
        order: 5
      },
      {
        title: '訂單成立後，是否可以取消或是更改訂單數量及商品？',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque!',
        order: 8
      },
      {
        title: '我想購買的商品已經缺貨，什麼時候會進貨呢？',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui iusto accusantium id animi tenetur autem laborum est, accusamus molestias atque dolor enim. Eos perferendis dignissimos eius sed nemo, doloremque cumque!',
        order: 7
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
