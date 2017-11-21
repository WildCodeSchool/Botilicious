'use strict';
module.exports = (sequelize, DataTypes) => {
  var sentences = sequelize.define('sentences', {
    text: DataTypes.TEXT,
    type: DataTypes.ENUM('Q', 'A')
  });

  sentences.associate = function (models) {
    sentences.belongsToMany(models.modules, {through: 'sentence_has_module', foreignKey: 'sentenceId'});
  };

  return sentences;
};
