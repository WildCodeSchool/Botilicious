'use strict';
var faker = require('faker');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tags', [{
      text: 'time',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    },
    {
      text: 'place',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
