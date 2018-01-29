module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
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
    firstname: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    dateofbirth: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    zipcode: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users'),
};
