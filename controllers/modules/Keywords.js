const models = require("../../models");

function selectKeywords(){
  return new Promise(function(resolve, reject) {
    console.log('Getting the data from the db');
    let records = [];

    models.Keyword
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

module.exports = selectKeywords;
