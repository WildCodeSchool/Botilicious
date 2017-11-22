'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('user', {
    firstname: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateofbirth: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  user.associate = function (models) {
    user.hasMany(models.chatbot);
  };

  return user;
};
