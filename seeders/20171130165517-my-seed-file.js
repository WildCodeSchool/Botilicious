'use strict';
var faker = require('faker');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      firstname: faker.name.firstName(),
      name: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      dateofbirth: faker.date.past(),
      address: faker.address.streetAddress(),
      zipcode: faker.address.zipCode(),
      city: faker.address.city(),
      phone: faker.phone.phoneNumber(),
      CreatedAt: faker.date.recent(),
      UpdatedAt: faker.date.recent()
    }], {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
