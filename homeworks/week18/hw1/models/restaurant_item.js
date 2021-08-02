'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant_item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    id_hash: DataTypes.STRING,
    delete_hash: DataTypes.STRING,
    link: DataTypes.STRING,
    on_sale: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Restaurant_item',
  });
  return Restaurant_item;
};