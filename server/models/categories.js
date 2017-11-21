'use strict';
module.exports = (sequelize, DataTypes) => {
  var categories = sequelize.define('categories', {
    // sequelize model:create --name categories --attributes "name:text"
    name: DataTypes.TEXT
  });

  categories.associate = function (models) {
    // associations can be defined here
    categories.belongsToMany(models.modules, {through: 'category_has_module'});
  };

  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       categories.belongsTo(modules, {through: 'category_has_module'});
  //     }
  //   }
  // });

  // categories.associate = function (models) {
  // }
  return categories;
};
