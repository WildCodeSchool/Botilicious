const models = require('../../models');

function getSentences(id) {
  return new Promise(((resolve, reject) => {
    const records = [];
    let myparams = {};

    if (id) {
      myparams = { where: { id } };
    }
    console.log('myparams', myparams);
    models.Sentence
      .findAll(myparams)
    // query ok
      .then((results) => {
      // console.log(results);
        results.map((result, i) => {
          records[i] = result.dataValues;
          // ESLint demande de renvoyer une valeur
          return i;
        });
        resolve(records);
      });
  }));
}

module.exports = getSentences;
