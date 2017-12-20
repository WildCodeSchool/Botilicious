const models = require("../../models");

function selectSentences(){
  return new Promise(function(resolve, reject) {
    console.log('Getting the data from the db');
    let records = [];

    models.Sentence
    .findAll({})
    // query ok
    .then(results => {
      // console.log(results);
      results.map((result, i) => {
        records[i] = result.dataValues;
      });
      resolve(records);
    });
  });
};

module.exports = selectSentences;
