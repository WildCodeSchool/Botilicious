const models = require("../models");
const selectSentences = require('./modules/Sentences');

var Sentences = {

  // Obtenir la liste des phrases existantes
  sentenceGet : function(req, res, next){
    console.log('Loading sentences');
    selectSentence().then(results => res.json({'Sentences': results}));
  },

  // Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
  sentencePost : function(req, res, next){
    // console.log(req.body);

    // insert into
    models.Sentence.findOrCreate(
      {
        where: {
          text: req.body.sentence,
          type: req.body.type
        }
      }
    )
    .spread(
      (sentence, created) => {
        // console.log('sentence: ', sentence.dataValues);
        let data = {sentence};
        // set the error key
        if(created){
          data.error = false;
        } else {
          data.error = true;
          data.serverMessage = 'Error, sentence not added - Already there or database error';
        }

        // send back the new sentence to the browser
        res.json(data)
      }
    )
  },

  //sentenceDelete
  sentenceDelete: function(req, res, next) {
    console.log(req.body);

    // insert into
    models.Sentence.destroy(
      {
        where: {id: req.body.id}
      }
    )
    .then(
      res.status(200).send('delete ok')
    )
  },

};

module.exports = Sentences;
