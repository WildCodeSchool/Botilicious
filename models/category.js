'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  });

  Category.associate = function(models) {
    Category.belongsToMany(models.Module, {foreignKey:"categoryId", through:"Category_has_Module"});
  };
  return Category;
};
