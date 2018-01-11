const models = require('../../models');
const getTags = require('./Tags');

function autoAddKeywords(sentence, pattern) {
  return new Promise((resolve, reject) => {
    // console.log(sentence.split(' ').length, pattern.split(' ').length);
    console.log(pattern);
    const foundKeywords = sentence.split(' ')
      .map((word, i) => {
        if (word !== pattern.split(' ')[i]) {
          // return { text: word };
          return { text: word, tag: pattern.split(' ')[i] };
        }
        return null;
      })
      .filter(element => element);
    console.log('foundKeywords: ', foundKeywords);
    getTags()
      .then((tags) => {
        console.log(tags);
        const myparams = foundKeywords;
        foundKeywords.forEach((foundK, i) => {
          console.log(tags.findIndex(tag => foundK.tag === `<${tag.text}>`));
          myparams[i].TagId = tags[tags.findIndex(tag => foundK.tag === `<${tag.text}>`)].id;
          myparams[i].confidence = 0.5;
        });
        console.log('myparams', myparams);
        models.Keyword
          .bulkCreate(myparams)
        // query ok
          .then((results) => {
            console.log('Keyword results: ', results);
            const records = [];
            if (results.length > 0) {
              results.map((result, i) => {
                // console.log(result.dataValues.Tag.dataValues);
                // console.log(result.dataValues);
                records[i] = {
                  id: result.dataValues.id,
                  text: result.dataValues.text,
                };
                return records;
              });
            }
            // console.log('records :', records);
            resolve(records);
          });
      });
  });
}

module.exports = autoAddKeywords;
