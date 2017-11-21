'use strict';
module.exports = (sequelize, DataTypes) => {
  var chatbots = sequelize.define('chatbot', {
    name: DataTypes.STRING
  });

  sentences.associate = function (chatbot) {
    chatbot.belongsTo(models.users);
    chatbot.belongsToMany(models.modules, {through: 'chatbot_has_module', foreignKey: 'chatbotId'});
  };

  return chatbot;
};
