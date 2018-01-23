const models = require('../../models');

function getSentences(where) {
  return new Promise((resolve, reject) => {
    // const records = [];
    const myparams = {
      where: {},
      include: [{
        model: models.Module,
        where: {},
        attributes: ['id', 'name', 'api'],
        // plain: true,
        // raw: true,
      }],
    };

    if (where) {
      myparams.where.moduleId = where.id;
    }
    console.log('getSentences myparams', myparams);
    resolve(models.Sentence
      .findAll(myparams)
      // query ok
      .then((results) => {
        console.log('getSentences results: ', results);
        return results;
      }));
  });
}

module.exports = getSentences;
