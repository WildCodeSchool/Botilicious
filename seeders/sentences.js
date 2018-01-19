const faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sentences', [{
      uuid: uuidv4(),
      text: 'Quel temps fait-il demain à Paris ?',
      type: 'question',
      next: 2,
      moduleId: 1,
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent(),
    },
    {
      uuid: uuidv4(),
      text: 'Quel temps fait-il demain à San Fransisco ?',
      type: 'question',
      next: 1,
      moduleId: 1,
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent(),
    },
    {
      uuid: uuidv4(),
      text: 'Bonjour Fransisco',
      type: 'answer',
      next: 1,
      moduleId: 1,
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent(),
    }], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Sentences', null, {}),
};
