'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sentence = sequelize.define('Sentence', {
    text: DataTypes.STRING,
    type: DataTypes.STRING
  });

  Sentence.associate = function(models) {
    Sentence.belongsToMany(models.Module, {foreignKey:"sentenceId", through:"Sentence_has_Module"});
  };
  return Sentence;
};
