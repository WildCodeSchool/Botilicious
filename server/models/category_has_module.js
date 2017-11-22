'use strict';
module.exports = function(sequelize, DataTypes) {
  var chatbot_has_module = sequelize.define('category_has_module', {
    categoryId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
  });

  return category_has_module;
};
