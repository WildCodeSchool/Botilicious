
const faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tags', [
      {
        uuid: uuidv4(),
        text: 'time',
        CreatedAt: faker.date.recent(),
        UpdatedAt: faker.date.recent(),
      },
      {
        uuid: uuidv4(),
        text: 'place',
        CreatedAt: faker.date.recent(),
        UpdatedAt: faker.date.recent(),
      },
      {
        uuid: uuidv4(),
        text: 'token',
        CreatedAt: faker.date.recent(),
        UpdatedAt: faker.date.recent(),
      },
      {
        uuid: uuidv4(),
        text: 'name',
        CreatedAt: faker.date.recent(),
        UpdatedAt: faker.date.recent(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tags', null, {}),
};
