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
  let parameters;
  let results;
  console.log('blobs: ', blobs);
  console.log('splitSentence: ', blobs[blobs.length - 1]);
  const promises = _.map(blobs, blob =>
    Promise
      .resolve()
      .then(() => {
        // console.log('blob.join( ), index: ', blob.join(' '), index);
        parameters = { where: { text: blob.join(' ') } };
        models.Sentence
          .findAll(parameters)
          .then((findResults) => {
            if (findResults.dataValues) {
              console.log('findResults: ', findResults);
              results.push(findResults.dataValues);
            }
            return 'bibi';
          });
        // return 'yoyo';
      }));
  // console.log('promises: ', promises);
  return promises;
}

function detectKeywords(sentence) {
  const splitSentence = sentence.split(' ');
  const blobs = nGrams(splitSentence);
  // const promise1 = new Promise(resolve => setTimeout(() => resolve('bobo'), 1000));
  // const promise2 = new Promise(resolve => setTimeout(() => resolve('tata'), 2000));
  // const promises = Promise.all([promise1, promise2])
  // console.log(findPattern(blobs));
  const promises = Promise.all(findPattern(blobs))

  // const promises = Promise.all(findPattern(blobs))
    // .then(() => Promise.all([promise1, promise2])
    .then((results) => {
      console.log('findPattern results: ', results);
      return results;
    });
  // console.log('promise: ', promise);
  return promises;
}

module.exports = detectKeywords;
