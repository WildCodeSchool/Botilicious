'use strict';
module.exports = (sequelize, DataTypes) => {
  var Module = sequelize.define('Module', {
    name: {type: DataTypes.STRING, unique: true},
    description: DataTypes.STRING,
    apiurl: DataTypes.STRING
  });

  Module.associate = function(models) {
    Module.belongsToMany(models.Category, {foreignKey:"moduleId", through:"Category_has_Module"});
    Module.belongsToMany(models.Sentence, {foreignKey:"moduleId", through:"Sentence_has_Module"});
    Module.belongsToMany(models.Keyword, {foreignKey:"moduleId", through:"Keyword_has_Module"});
    Module.belongsToMany(models.Chatbot, {foreignKey:"moduleId", through:"Chatbot_has_Module"});
  };
  return Module;
};
