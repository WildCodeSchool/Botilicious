const models = require("../../models");

function selectKeywords(TagId){
  return new Promise(function(resolve, reject) {
    let myparams = {
      include: [models.Tag]
    };
    console.log(TagId);
    if (TagId) {
      myparams.where = {TagId : TagId}
    };
    console.log('myparams', myparams);
    models.Keyword
    .findAll(myparams)
    // query ok
    .then(results => {
      // console.log(results);
      let records = [];
      if (results.length > 0) {
        results.map((result, i) => {
          // console.log(result.dataValues.Tag.dataValues);
          // console.log(result.dataValues);
          records[i] = {
            'id':result.dataValues.id,
            'text':result.dataValues.text,
            'TagId':result.dataValues.Tag.dataValues.id,
            'tag':result.dataValues.Tag.dataValues.text
          };
        });
      }
      console.log('records :', records);
      resolve(records);
    });
  });
};

module.exports = selectKeywords;
