const models = require('../models');
const getSentences = require('./modules/Sentences');

const Sentences = {

  // Obtenir la liste des phrases existantes
  sentenceGet(req, res) {
    // console.log('Loading sentences');
    getSentences().then(results => res.json({ Sentences: results }));
  },

  // Accepter les données du formulaire 'Nouvelles phrases'
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

    // delete
    models.Sentence.destroy({
      where: { id: req.body.id },
    })
      .then(res.status(200).json({ servermessage: 'delete ok' }));
  },

};

module.exports = Sentences;
