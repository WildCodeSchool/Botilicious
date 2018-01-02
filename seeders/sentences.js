'use strict';
var faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sentences', [{
      uuid: uuidv4(),
      text: 'Quel temps fait-il demain à Paris ?',
      type: 'question',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      uuid: uuidv4(),
      text: 'Quel temps fait-il demain à San Fransisco ?',
      type: 'question',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      uuid: uuidv4(),
      text: 'Bonjour Fransisco',
      type: 'answer',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sentences', null, {});
  }
};
