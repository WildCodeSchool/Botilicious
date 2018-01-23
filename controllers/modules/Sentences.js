const models = require('../../models');

function getSentences(id) {
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

    if (id) {
      myparams.where.id = id;
    }
    console.log('myparams', myparams);
    resolve(models.Sentence
      .findAll(myparams)
      // query ok
      .then(results => results));
  });
}

module.exports = getSentences;
