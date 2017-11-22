'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('keyword_has_module', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keywordId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'keywords',
          key: 'id'
        }
      },
      moduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'modules',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('keyword_has_module');
  }
};
