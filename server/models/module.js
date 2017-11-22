'use strict';
module.exports = (sequelize, DataTypes) => {
  var modules = sequelize.define('module', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    apiurl: DataTypes.TEXT
  });
  module.associate = function (models) {
    module.belongsToMany(models.categories, {through: 'category_has_module', foreignKey: 'moduleId'});
    module.belongsToMany(models.sentences, {through: 'sentence_has_module', foreignKey: 'moduleId'});
    module.belongsToMany(models.keywords, {through: 'keyword_has_module', foreignKey: 'moduleId'});
    module.belongsToMany(models.chatbots, {through: 'chatbot_has_module', foreignKey: 'moduleId'});
  };

  return module;
};
