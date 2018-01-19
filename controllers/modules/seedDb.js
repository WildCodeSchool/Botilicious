const models = require('../../models');
const uuidv4 = require('uuid/v4');
const faker = require('faker');
const getKeywords = require('./Keywords');

function seedDb() {
  console.log('seeding');
  // models.Keyword.create({
  //   uuid: uuidv4(),
  //   text: 'French',
  //   confidence: 1,
  //   CreatedAt: faker.date.recent(),
  //   UpdatedAt: faker.date.recent(),
  //   Tag: {
  //     text: 'language',
  //   },
  // }, { include: [models.Tag] })
  //   .catch(error => error);

  models.Tag.create({
    uuid: uuidv4(),
    text: 'country',
    CreatedAt: faker.date.recent(),
    UpdatedAt: faker.date.recent(),
    Keyword: [
      {
        text: 'France',
        confidence: 1,
      },
      {
        text: 'Japan',
        confidence: 1,
      },
    ],
  }, { include: [models.Keyword] });

  // getKeywords()
  //   .then((keywords) => {
  //     console.log('keywords: ', keywords);
  //   });
  return 'created';
}

module.exports = seedDb;
