const models = require('../../models');
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

function findPattern(blobs) {
  // console.log('blobs: ', blobs);
  const splitSentence = blobs[blobs.length - 1];
  console.log('splitSentence: ', splitSentence);
  const promises = _.map(blobs, blob =>
    Promise
      .resolve()
      .then(() => {
        // console.log('blob.join( ), index: ', blob.join(' '), index);
        // if (typeof (blob) === 'array') {
        console.log('blob: ', blob);
        // console.log('length: ', blob.length);
        const patternsToTest = splitSentence.map((word, i) => {
          if (splitSentence.findIndex(blob) > 0) {
            console.log(i, word);
            return splitSentence.splice(i, blob.length, blob);
          }
          return splitSentence[i];
        });
        console.log('patternsToTest: ', patternsToTest);
        const parameters = { where: patternsToTest };
        // console.log('parameters', parameters);
        return parameters;
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

            // return results.reduce(element => element.length > 0);
          }),
        // }
      )
      .then(results =>
        // console.log('findPattern results IN: ', results);
        results)
      .catch((err) => {
        console.log(err);
        return [];
      }));
  console.log('promises: ', promises);
  return promises;
}

function detectKeywords(sentence) {
  const splitSentence = sentence.split(' ');
  const blobs = nGrams(splitSentence);

  const promise = Promise.all(findPattern(blobs))
    .then(results =>
      // console.log('findPattern results OUT: ', results);
      results.filter(element => element.length !== 0),
      // return results;
    );
  console.log('promise: ', promise);
  return promise;
}

module.exports = detectKeywords;
