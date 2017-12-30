const models = require('../models');
const getSentences = require('./modules/Sentences');
const getKeywords = require('./modules/Keywords');
// const getTags = require('./modules/Tags');

function AutoTagSentence(originalSentence, keywords, separators) {
  const splitSentence = originalSentence.split(separators[0]);
  const foundKeywords = [];
  const asAnArray = [];
  let wordsToCheck;
  let nbOfKeywords;
  let keywordArray;
  splitSentence.map((word, i, array) => keywords.findIndex((keyword) => {
    // console.log('keyword.text: ', keyword.text);
    // console.log('array: ', array);
    nbOfKeywords = keyword.text.split(' ').length;
    // console.log('nbOfKeywords: ', nbOfKeywords);
    // console.log('i: ', i);
    wordsToCheck = array.slice(i, i + nbOfKeywords);
    // console.log('wordsToCheck: ', wordsToCheck);
    if (wordsToCheck.join(' ') === keyword.text) {
      foundKeywords.push({
        text: wordsToCheck.join(' '),
        TagId: keyword.TagId,
        tag: keyword.tag,
      });
      // console.log('foundKeywords: ', foundKeywords);
      // console.log([wordsToCheck.join(separators[0])]);
      keywordArray = [wordsToCheck.join(separators[0])].concat(Array(nbOfKeywords - 1).fill(''));
      // asAnArray.splice(i, (i + nbOfKeywords) - 1, keywordArray);
      // console.log('keywordArray: ', keywordArray);
      asAnArray.splice(i, keywordArray);
      // console.log('asAnArray: ', asAnArray);
      // console.log('i: ', i);
      // console.log('nbOfKeywords: ', nbOfKeywords);
    } else if (asAnArray[i] === '') {
      // console.log('asAnArray2: ', asAnArray);
    } else {
      asAnArray[i] = word;
    }
    // console.log('asAnArray3: ', asAnArray);
    return null;
  }));
  let sentence = originalSentence;
  foundKeywords.map(keyword =>
    sentence = sentence.replace(keyword.text, `<${keyword.tag}>`));
  return {
    originalSentence, sentence, foundKeywords, array: asAnArray,
  };
}

const Sentences = {

  // Obtenir la liste des phrases existantes
  sentenceGet(req, res) {
    // console.log('Loading sentences');
    getSentences().then(results => res.json({ Sentences: results }));
  },

  // Accepter les données du formulaire 'Nouvelles phrases'
  sentencePost(req, res) {
    console.log(req.body);

    if (!req.body.text) {
      res.json({ serverMessage: 'Error, Sentence length is 0', error: true });
    } else {
    // insert into
      models.Sentence.findOrCreate({
        where: {
          text: req.body.text,
          type: req.body.type,
          next: req.body.next,
        },
      })
        .spread((sentence, created) => {
        // console.log('sentence: ', sentence.dataValues);
          const data = { sentence };
          // set the error key
          if (created) {
            data.error = false;
          } else {
            data.error = true;
            data.serverMessage = 'Error, sentence not added - Already there or database error';
          }

          // send back the new sentence to the browser
          res.json(data);
        });
    }
  },

  // sentenceDelete
  sentenceDelete(req, res) {
    console.log(req.body);

    // delete
    models.Sentence.destroy({
      where: { id: req.body.id },
    })
      .then(res.status(200).json({ servermessage: 'delete ok' }));
  },

  // route that takes a sentence then gets keywords and returns tagged keywords
  // ex.: 'Quel temps fait-il demain à Paris ?' =>
  // {
  // sentence: 'Quel temps fait-il <time> à <place> ?',
  // tags: [{ text: 'temps', tagId: 1 }, { text: 'Paris', tagId: 2 }]
  // }

  sentenceAutotagPost(req, res) {
    const separators = [' ', '-'];
    // const sentence = req.body.sentence;
    // console.log('sentence: ', sentence);
    getKeywords().then((keywords) => {
      // console.log('Keywords: ', keywords);
      const data = AutoTagSentence(req.body.sentence, keywords, separators);
      // console.log('data: ', data);
      res.json(data);
    });
  },

};

module.exports = Sentences;
