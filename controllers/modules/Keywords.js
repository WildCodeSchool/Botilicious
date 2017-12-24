const models = require("../../models");

function selectKeywords(id){
  return new Promise(function(resolve, reject) {
    let records = [];
    let myparams = {
      include: [models.Tag],
    };

    if (id) {
      myparams[where] = {id : id}
    };
    console.log('myparams', myparams);
    models.Keyword
    .findAll(myparams)
    // query ok
    .then(results => {
      // console.log(results);
      if (results.length > 0) {
        results.map((result, i) => {
          // console.log(result.dataValues.Tag.dataValues);
          console.log(result.dataValues);
          records[i] = {'id':result.dataValues.id, 'text':result.dataValues.text, 'TagId':result.dataValues.Tag.dataValues.id, 'tag':result.dataValues.Tag.dataValues.text};
        });
      }
      resolve(records);
    });
  });
};

module.exports = selectKeywords;
