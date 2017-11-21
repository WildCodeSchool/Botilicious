'use strict';
module.exports = (sequelize, DataTypes) => {
  var keywords = sequelize.define('keywords', {
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return keywords;
};
