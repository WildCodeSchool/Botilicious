const models = require('../../models');

function getModules(where) {
  return new Promise(((resolve, reject) => {
    const myparams = {};

    if (where) {
      myparams[where] = where;
    }
    console.log('getModules myparams', myparams);
    models.Module
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
      })
      .catch(error => reject(error));
  }));
}

module.exports = getModules;
