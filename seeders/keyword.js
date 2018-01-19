
const faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Keywords', [
      {
        uuid: uuidv4(),
        text: 'demain',
        confidence: 1,
        TagId: 1,
        CreatedAt: faker.date.recent(),
        UpdatedAt: faker.date.recent(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Keywords', null, {}),
};
