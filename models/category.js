module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, unique: true },
  });

  Category.associate = function (models) {
    Category.belongsToMany(models.Module, { foreignKey: 'categoryId', through: 'Category_has_Module' });
  };
  return Category;
};
