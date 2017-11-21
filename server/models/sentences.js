'use strict';
module.exports = (sequelize, DataTypes) => {
  var sentences = sequelize.define('sentences', {
    text: DataTypes.TEXT,
    type: DataTypes.ENUM('Q', 'A')
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sentences;
};
