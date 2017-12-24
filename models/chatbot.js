'use strict';
module.exports = (sequelize, DataTypes) => {
  var Chatbot = sequelize.define('Chatbot', {
    name: {type: DataTypes.STRING, unique: true}
  });

  Chatbot.associate = function(models) {
    Chatbot.belongsTo(models.User);
    Chatbot.belongsToMany(models.Module, {foreignKey:"chatbotId", through:"Chatbot_has_Module"});
  };
  return Chatbot;
};
