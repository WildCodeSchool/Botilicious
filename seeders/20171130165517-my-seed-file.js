'use strict';
var faker = require('faker');
const uuidv4 = require('uuid/v4');

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      uuid: uuidv4(),
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
    },
    {
      uuid: uuidv4(),
      firstname: 'Bob',
      name: 'Bob',
      email: 'bob@bob.com',
      password: 'bob',
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
