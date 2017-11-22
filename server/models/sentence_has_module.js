'use strict';
module.exports = function(sequelize, DataTypes) {
  var chatbot_has_module = sequelize.define('sentence_has_module', {
    sentenceId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
  });

  return sentence_has_module;
};
