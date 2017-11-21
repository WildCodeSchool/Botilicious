'use strict';
module.exports = (sequelize, DataTypes) => {
  var modules = sequelize.define('modules', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    apiurl: DataTypes.TEXT
  });
  modules.associate = function (models) {
    // associations can be defined here
    modules.belongsToMany(models.categories, {through: 'category_has_module'});
  };

  //
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       modules.belongsTo(categories, {through: 'category_has_module'});
  //     }
  //   }
  // });

  // categories.associate = function (models) {
  // };
  return modules;
};
