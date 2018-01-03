const models = require('../../models');

function getTags(id) {
  return new Promise(((resolve, reject) => {
    let myparams = {};

    if (id) {
      myparams = { where: { id } };
    }
    // console.log('myparams', myparams);
    models.Tag
      .findAll(myparams)
    // query ok
      .then((results) => {
      // console.log(results);
        const records = [];
        results.map((result, i) => {
          records[i] = result.dataValues;
          // ESLint demande de renvoyer une valeur
          return i;
        });
        resolve(records);
      });
  }));
}

module.exports = getTags;
