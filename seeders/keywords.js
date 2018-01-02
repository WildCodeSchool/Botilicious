'use strict';
var faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Keywords', [{
      uuid: uuidv4(),
      text: 'demain',
      TagId: 1,
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      uuid: uuidv4(),
      text: 'Paris',
      TagId: 2,
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      uuid: uuidv4(),
      text: 'San Fransisco',
      TagId: 2,
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      uuid: uuidv4(),
      text: 'Fransisco',
      TagId: 3,
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Keywords', null, {});
  }
};
