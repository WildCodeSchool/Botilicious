'use strict';
module.exports = (sequelize, DataTypes) => {
  var Keyword = sequelize.define('Keyword', {
    text: {type: DataTypes.STRING, unique: true}
  });

  Keyword.associate = function(models) {
    // Keyword.belongsTo(models.Tag, {foreignKey:"KeywordId", through:"Keyword_has_Tag"});
    Keyword.belongsTo(models.Tag);
    Keyword.belongsToMany(models.Module, {foreignKey:"keywordId", through:"Keyword_has_Module"});
  };
  return Keyword;
};
