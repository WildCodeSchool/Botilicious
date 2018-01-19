
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sentences', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    uuid: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    text: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    next: {
      type: Sequelize.INTEGER,
    },
    moduleId: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Sentences'),
};
