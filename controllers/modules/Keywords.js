const models = require('../../models');

function selectKeywords(where) {
  return new Promise(((resolve, reject) => {
    const myparams = {
      include: [models.Tag],
    };
    console.log('where: ', where);
    if (where) {
      myparams.where = where;
    }
    console.log('myparams', myparams);
    models.Keyword
      .findAll(myparams)
    // query ok
      .then((results) => {
      // console.log(results);
        const records = [];
        if (results.length > 0) {
          results.map((result, i) => {
          // console.log(result.dataValues.Tag.dataValues);
          // console.log(result.dataValues);
            records[i] = {
              id: result.dataValues.id,
              text: result.dataValues.text,
              TagId: result.dataValues.Tag.dataValues.id,
              tag: result.dataValues.Tag.dataValues.text,
            };
            return records;
          });
        }
        console.log('records :', records);
        resolve(records);
      });
  }));
}

module.exports = selectKeywords;
