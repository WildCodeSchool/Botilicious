'use strict';
var faker = require('faker');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Chatbots', [{
      name: 'ChatbotTest1',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
  },
// http://api.openweathermap.org/data/2.5/forecast
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chatbots', null, {});
  }
};
