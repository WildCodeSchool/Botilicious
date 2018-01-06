
const faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Modules', [{
      uuid: uuidv4(),
      name: 'meteo',
      description: 'Weather with Openweathermap',
      api: JSON.stringify({
        url: 'http://api.openweathermap.org/data/2.5/forecast',
        parameters: [
          { tag: 'place', text: 'q' },
        ],
        fixed: [
          { text: 'APPID', value: '096247cb370ee7b808f6578b219dec6c' },
        ],
      }),
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent(),
    }], {});
  },
  // http://api.openweathermap.org/data/2.5/forecast
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Modules', null, {}),
};
