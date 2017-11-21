'use strict';
module.exports = (sequelize, DataTypes) => {
  var categories = sequelize.define('categories', {
    name: DataTypes.TEXT
  });

  categories.associate = function (models) {
    categories.belongsToMany(models.modules, {through: 'category_has_module', foreignKey: 'categoryId'});
  };

  return categories;
};
