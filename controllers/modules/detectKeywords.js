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

function generatePatterns(splitSentence) {
  const patterns = [];
  let tempArray;
  for (let i = 0; i < (2 ** splitSentence.length) - 1; i += 1) {
    tempArray = [];
    const roundNb = _.padStart((i).toString(2), 4, '0');
    // console.log(roundNb);
    for (let j = 0; j < splitSentence.length; j += 1) {
      // console.log(roundNb[j]);
      if (roundNb[j] === '1') {
        tempArray[j] = '%';
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
      const patterns = generatePatterns(splitSentence);
      // console.log('patterns :', patterns);


      // searchFor = searchFor.map((item) => {
      //     return {$iLike: item};
      // });

      const toSeek = patterns.map(pattern => (
        {
          // $like: pattern.join(' ').replace(/<tag>/g, '%'),
          $like: pattern.join(' '),
        }
      ));
      const patternsToTest = {
        where: {
          $or: [
            { text: { $or: toSeek } },
          ],
        },
      };
      // console.log('toSeek: ', toSeek);


      // const patternsToTest = {
      //   where: {
      //     text: {
      //       [Sequelize.Op.or]: patterns.map(pattern => pattern.join(' ')),
      //     },
      //   },
      // };

      // Sequelize.literal('name REGEXP \expression`';`

      return patternsToTest;
    })
    .then(parameters =>
      models.Sentence
        .findAll(parameters)
        .then((findResults) => {
          if (findResults.length > 0) {
            // console.log('findResults map dataValues: ', findResults.map(res => res.dataValues));
            return findResults.map(findResult => findResult.dataValues);
          }
          return [];
        }))
    .then(results =>
      // console.log('findPattern results IN: ', results);
      results.sort((result2, result1) => (result1.text.match(/<[a-z]+>/g) || []).length - (result2.text.match(/<[a-z]+>/g) || []).length))
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
    .then((results) => {
      console.log('findPattern result OUT: ', results);
      return results;
    });
  console.log('promise: ', promise);
  return promise;
}

module.exports = detectKeywords;
