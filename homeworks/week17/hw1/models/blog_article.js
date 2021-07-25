'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog_article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      blog_article.belongsTo(models.blog_category, {
        foreignKey: 'category_id'
      })
    }
  };
  blog_article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'blog_article',
    updatedAt: false
  });
  return blog_article;
};