'use strict';
module.exports = function(sequelize, DataTypes) {
  var chatbot_has_module = sequelize.define('keyword_has_module', {
    keywordId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
  });

  return keyword_has_module;
};
