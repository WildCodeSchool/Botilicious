'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    text: DataTypes.STRING
  });

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Keyword, {foreignKey:"tagId", through:"Keyword_has_Tag"});
  };
  return Tag;
};
