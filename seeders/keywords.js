'use strict';
var faker = require('faker');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Keywords', [{
      text: faker.name.firstName(),
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Keywords', null, {});
  }
};
