'use strict';
module.exports = function(sequelize, DataTypes) {
  var chatbot_has_module = sequelize.define('chatbot_has_module', {
    chatbotId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
  });

  return chatbot_has_module;
};
