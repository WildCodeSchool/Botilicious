const models = require('../models');
const selectSentences = require('./modules/Sentences');

const Sentences = {

  // Obtenir la liste des phrases existantes
  sentenceGet(req, res) {
    // console.log('Loading sentences');
    selectSentences().then(results => res.json({ Sentences: results }));
  },

  // Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
  sentencePost(req, res) {
    console.log(req.body);

    // insert into
    models.Sentence.findOrCreate({
      where: {
        text: req.body.sentence,
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
  },

  // sentenceDelete
  sentenceDelete(req, res) {
    console.log(req.body);

    // insert into
    models.Sentence.destroy({
      where: { id: req.body.id },
    })
      .then(res.status(200).send('delete ok'));
  },

};

module.exports = Sentences;
