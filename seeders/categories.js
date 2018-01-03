'use strict';
var faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [{
      uuid: uuidv4(),
      name: faker.name.lastName(),
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
