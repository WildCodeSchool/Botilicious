'use strict';
module.exports = (sequelize, DataTypes) => {
  var Keyword = sequelize.define('Keyword', {
    text: DataTypes.STRING
  });

  Keyword.associate = function(models) {
    Keyword.belongsTo(models.Tag);
    Keyword.belongsToMany(models.Module, {foreignKey:"keywordId", through:"Keyword_has_Module"});
  };
  return Keyword;
};
