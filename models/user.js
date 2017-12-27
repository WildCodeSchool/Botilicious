
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    dateofbirth: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.belongsToMany(models.Chatbot, { foreignKey: 'userId', through: 'User_has_Chatbot' });
  };
  return User;
};
