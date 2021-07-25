'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class draw_api extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  draw_api.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo_link: DataTypes.TEXT,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'draw_api',
  });
  return draw_api;
};