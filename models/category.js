module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },

  });

  Category.associate = function (models) {
    Category.belongsToMany(models.Module, { foreignKey: 'categoryId', through: 'Category_has_Module' });
  };
  return Category;
};
