'use strict';
module.exports = (sequelize, DataTypes) => {
  var keywords = sequelize.define('keywords', {
    text: DataTypes.TEXT
  });

  keywords.associate = function (models) {
    keywords.belongsToMany(models.modules, {through: 'keyword_has_module', foreignKey: 'keywordId'});
  };

  return keywords;
};
