'use strict';
var faker = require('faker');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      firstname: faker.name.firstName(),
      name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.lorem.sentence(),
      dateofbirth: faker.date.recent(),
      address: faker.lorem.sentence(),
      zipcode: faker.lorem.sentence(),
      city: faker.lorem.sentence(),
      phone: faker.lorem.sentence(),
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
