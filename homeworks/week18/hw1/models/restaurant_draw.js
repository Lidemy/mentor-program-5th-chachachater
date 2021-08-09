'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant_draw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant_draw.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo_link: DataTypes.TEXT,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant_draw',
  });
  return Restaurant_draw;
};