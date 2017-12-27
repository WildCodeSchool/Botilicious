
module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    text: DataTypes.STRING,
    type: DataTypes.STRING,
    next: DataTypes.INTEGER,
  });

  Sentence.associate = function (models) {
    Sentence.belongsToMany(models.Module, { foreignKey: 'sentenceId', through: 'Sentence_has_Module' });
  };
  return Sentence;
};
