const models = require("../../models");

function selectTags(id){
  return new Promise(function(resolve, reject) {
    let records = [];
    let myparams = {};

    if (id){
      myparams = {where : {id : id}}
    }
    console.log('myparams', myparams);
    models.Tag
    .findAll(myparams)
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

module.exports = selectTags;
