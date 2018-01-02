'use strict';
var faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tags', [{
      uuid: uuidv4(),
      text: 'time',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      uuid: uuidv4(),
      text: 'place',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      uuid: uuidv4(),
      text: 'name',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
