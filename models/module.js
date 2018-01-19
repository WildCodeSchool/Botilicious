module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    api: DataTypes.TEXT,
  });

  Module.associate = function (models) {
    Module.belongsToMany(models.Category, { foreignKey: 'moduleId', through: 'Category_has_Module' });
    Module.hasMany(models.Sentence, { foreignKey: 'moduleId' });
    Module.belongsToMany(models.Keyword, { foreignKey: 'moduleId', through: 'Keyword_has_Module' });
    Module.belongsToMany(models.Chatbot, { foreignKey: 'moduleId', through: 'Chatbot_has_Module' });
  };
  return Module;
};

// Exemple api (type TEXT):

// api: JSON.stringify({
//   url: 'http://api.openweathermap.org/data/2.5/forecast',
//   parameters: [
//     { tag: 'place', text: 'q' },
//   ],
//   fixed: [
//     { text: 'APPID', value: '096247cb370ee7b808f6578b219dec6c' },
//   ],
// }),
