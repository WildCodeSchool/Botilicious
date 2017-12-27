module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, unique: true },
  });

  Chatbot.associate = function (models) {
    Chatbot.belongsTo(models.User);
    Chatbot.belongsToMany(models.Module, { foreignKey: 'chatbotId', through: 'Chatbot_has_Module' });
  };
  return Chatbot;
};
