const models = require('../../models');
const Sequelize = require('sequelize');
const _ = require('lodash');

function nGrams(splitSentence) {
  const ngrams = [];
  let ngramToAdd;
  if (splitSentence.length > 0) {
    splitSentence.map((word, index) => {
      // console.log('word: ', word);
      // console.log('index: ', index);
      for (let i = 0; i < (splitSentence.length - index); i += 1) {
        // console.log('i: ', i);
        ngramToAdd = splitSentence.slice(i, i + index + 1);
        // console.log(ngramToAdd);
        ngrams.push(ngramToAdd);
        // console.log('ngrams: ', ngrams);
      }
      // if (i < splitSentence.length) {
      //   ngrams.push([word, splitSentence[i + 1]]);
      // }
      return null;
    });
    // console.log('ngrams_final: ', ngrams);
  }
  return ngrams;
}

function tryPatterns(splitSentence) {
  const patterns = [];
  let tempArray;
  for (let i = 1; i < (2 ** splitSentence.length) - 1; i += 1) {
    tempArray = [];
    const roundNb = _.padStart((i).toString(2), 4, '0');
    // console.log(roundNb);
    for (let j = 0; j < splitSentence.length; j += 1) {
      // console.log(roundNb[j]);
      if (roundNb[j] === '1') {
        tempArray[j] = '<tag>';
      } else {
        tempArray[j] = splitSentence[j];
      }
    }
    // console.log(tempArray);
    patterns.push(tempArray);
  }
  return patterns;
}

function findPattern(splitSentence) {
  console.log('splitSentence: ', splitSentence);
  const promises = Promise
    .resolve()
    .then(() => {
      const patterns = tryPatterns(splitSentence);
      console.log('patterns :', patterns);
      // const patternsToTest = [['Quel', 'temps', 'fait-il', '<tag>', 'à', '<tag>', '?']];

      // Post.findAll({
      //   where: {
      //     authorId: {
      //       [Op.or]: [12, 13]
      //     }
      //   }
      // });


      const patternsToTest = {
        where: {
          text: {
            [Sequelize.Op.or]: [patterns[0].join(' '), patterns[1].join(' ')],
          },
        },
      };
      // Sequelize.literal('name REGEXP \expression`';`
      return patternsToTest;
    })
    .then(parameters =>
      models.Sentence
        .findAll(parameters)
        .then((findResults) => {
          const results = [];
          if (findResults[0]) {
            console.log('findResults[0].dataValues: ', findResults[0].dataValues);
            results.push(findResults[0].dataValues);
            return results[0];
          }
          return results;
        }))
    .then(results =>
      // console.log('findPattern results IN: ', results);
      results)
    .catch((err) => {
      console.log(err);
      return [];
    });
  console.log('promises: ', promises);
  return promises;
}

function detectKeywords(sentence) {
  const splitSentence = sentence.split(' ');
  // const blobs = nGrams(splitSentence);

  const promise = findPattern(splitSentence)
    .then((result) => {
      console.log('findPattern result OUT: ', result);
      return result;
    });
  console.log('promise: ', promise);
  return promise;
}

module.exports = detectKeywords;
