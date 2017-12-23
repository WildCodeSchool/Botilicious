const models = require("../../models");

// function selectKeywords(id, text){
function selectKeywords(){
  return new Promise(function(resolve, reject) {
    // console.log('Getting the data from the db');
    let records = [];

    models.Keyword
    .findAll({
      include: [models.Tag],
      // where : {id : id}
    })
    // query ok
    .then(results => {
      results.map((result, i) => {
        console.log(result.dataValues.Tag.dataValues);
        // console.log(result.dataValues);
        records[i] = {'id':result.dataValues.id, 'text':result.dataValues.text, 'TagId':result.dataValues.Tag.dataValues.id, 'tag':result.dataValues.Tag.dataValues.text};
      });
      resolve(records);
    });
  });
};

module.exports = selectKeywords;
