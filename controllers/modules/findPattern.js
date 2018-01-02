const models = require('../../models');

function nGrams(splitSentence) {
  const ngrams = [];
  let ngramToAdd;
  if (splitSentence.length > 0) {
    splitSentence.map((word, index) => {
      // console.log('word: ', word);
      console.log('index: ', index);
      for (let i = 0; i < (splitSentence.length - index); i += 1) {
        console.log('i: ', i);
        ngramToAdd = splitSentence.slice(i, i + index + 1);
        console.log(ngramToAdd);
        ngrams.push(ngramToAdd);
        console.log('ngrams: ', ngrams);
      }
      // if (i < splitSentence.length) {
      //   ngrams.push([word, splitSentence[i + 1]]);
      // }
      return null;
    });
    console.log('ngrams_final: ', ngrams);
  }
  return ngrams;
}


function findPattern(sentence) {
  let pattern;
  const splitSentence = sentence.split(' ');
  pattern = nGrams(splitSentence);
  // const parameters = { where: {} };
  // parameters.where = { text: sentence };
  // models.Sentence
  //   .findAll(parameters)
  //   .then((results) => {
  //     console.log('results: ', results);
  //     pattern = results[0];
  //   })
  //   .catch((error) => {
  //     console.log('error ', error);
  //     return (new Error());
  //   });

  return pattern;
}

module.exports = findPattern;
