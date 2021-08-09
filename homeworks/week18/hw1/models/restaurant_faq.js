'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant_faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant_faq.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant_faq',
  });
  return Restaurant_faq;
};