module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      unique: true,
    },
    confidence: DataTypes.FLOAT,
    TagId: DataTypes.INTEGER,
  });

  Keyword.associate = function (models) {
    Keyword.belongsTo(models.Tag);
    Keyword.belongsToMany(models.Module, { foreignKey: 'keywordId', through: 'Keyword_has_Module' });
  };

  return Keyword;
};
