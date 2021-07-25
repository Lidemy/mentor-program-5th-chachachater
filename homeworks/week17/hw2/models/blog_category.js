'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      blog_category.hasMany(models.blog_article, { // notice
        foreignKey: 'category_id'
      })
    }
  };
  blog_category.init({
    category: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'blog_category',
    updatedAt: false
  });
  return blog_category;
};