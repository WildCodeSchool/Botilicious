
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
        // required paramters, given by the chatbot user
        parameters: [
          { type: 'out', tag: 'place', text: 'q' },
          { type: 'in', tag: 'time', value: 'list[time].dt_txt' },
          { type: 'in', tag: 'city', value: 'city.name' },
          { type: 'in', tag: 'country', value: 'city.country' },
          { type: 'in', tag: 'weather', value: 'list[time].weather[0].description' },
          { type: 'in', tag: 'temperature', value: 'list[time].main.temp-273' },
        ],
        // required parameters, to be added to the given parameters above
        fixed: [
          { type: 'out', text: 'APPID', value: '096247cb370ee7b808f6578b219dec6c' },
        ],
        answer: 'Weather (<time> City: <city> (<country>) ): <weather> <temperature> °C',
      }),
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent(),
    }], {});
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Modules', null, {}),
};
