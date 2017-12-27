'use strict';
var faker = require('faker');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Modules', [{
      name: 'meteo',
      description: 'Weather with Openweathermap',
      apiurl: 'http://api.openweathermap.org/data/2.5/forecast',
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
  },
// http://api.openweathermap.org/data/2.5/forecast
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Modules', null, {});
  }
};
