const models = require("../../models");

function selectKeywords(){
  return new Promise(function(resolve, reject) {
    // console.log('Getting the data from the db');
    let records = [];

    models.Keyword
    .findAll({include: [models.Tag]})
    // .findAll({include : [{ model: models.Tag, through:{attributes: 'text'}}]})
    // .findAll({include : [{ model: models.Tag, attributes: 'text'}]})
    // .findAll({
    //   include: [{
    //     model: [models.Tag],
    //     through: {
    //       attributes: ['text', 'createdAt', 'startedAt']
    //     }
    //   }]
    // })
    // query ok
    .then(results => {
      results.map((result, i) => {
        console.log(result.dataValues.Tag.dataValues.text);
        records[i] = {'text':result.dataValues.text,'tag':result.dataValues.Tag.dataValues.text};
      });
      resolve(records);
    });
  });
};

module.exports = selectKeywords;
