module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Tag.associate = function (models) {
    // Tag.belongsToMany(models.Keyword, { foreignKey: 'TagId', through: 'Keyword_has_Tag' });
    // Tag.belongsToMany(models.Keyword, { foreignKey: 'TagId' });
    Tag.hasMany(models.Keyword, { foreignKey: 'TagId' });
  };
  return Tag;
};
