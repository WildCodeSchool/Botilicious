module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    text: { type: DataTypes.STRING, unique: true },
  });

  Tag.associate = function (models) {
    Tag.belongsToMany(models.Keyword, { foreignKey: 'TagId', through: 'Keyword_has_Tag' });
  };
  return Tag;
};
