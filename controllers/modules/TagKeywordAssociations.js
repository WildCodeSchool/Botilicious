const models = require("../../models");

function selectTagKeywordAssociations(){
  return new Promise(function(resolve, reject) {
    console.log('Getting the data from the db');
    let records = [];

    models.Tag
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

module.exports = selectTagKeywordAssociations;
