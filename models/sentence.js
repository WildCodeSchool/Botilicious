'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sentence = sequelize.define('Sentence', {
    text: DataTypes.STRING,
    type: DataTypes.STRING,
    next: DataTypes.INTEGER
  });

  Sentence.associate = function(models) {
    Sentence.belongsToMany(models.Module, {foreignKey:"sentenceId", through:"Sentence_has_Module"});
    /**
     * table d'association pour les phrases entre elles
     * Sentence.belongsToMany(models.Sentence, {foreignKey:"sentenceId", through:"Sentence_has_Sentence"});
     */
  };
  return Sentence;
};
