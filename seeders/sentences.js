const faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sentences', [], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Sentences', null, {}),
};
