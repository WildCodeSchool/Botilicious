module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    text: DataTypes.STRING,
    type: DataTypes.STRING,
    next: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
  });

  Sentence.associate = function (models) {
    // Sentence.belongsToMany(models.Sentence, { foreignKey: 'sentenceId', through: 'Sentence_has_Sentence' });
    // Sentence.belongsToMany(models.Module, { foreignKey: 'sentenceId', through: 'Sentence_has_Module' });
    Sentence.belongsTo(models.Module);
  };
  return Sentence;
};
