const models = require("../models");

var Sentences = {

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
    );

    /**
     * méthode sequelize pour trouver des données de la bdd et qui retourne un model 
     */ 
    sentence.findAll({
      attributes : ['text', 'type']
    });

    /**
     * Fonction qui permet de déclencher les réponses par rapport aux questions (tous les deux présents en bdd)
     */
    sentence.then(function(res, arr, array) {
      console.log(res);
      let item = sentence.text;
      for(var x=0; x<arr.length; x++)
          for(var y=0; y<array.length; y++){
            if(arr[x][y] == string){
              items = array[x];
              item = items[Math.floor(Math.random()*items.length)];
            }
          }
      return item;
    });
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
      // (sentence, created) => {
      //   console.log('sentence: ', sentence.dataValues);
      //   let data = {sentence};
      //   // set the error key
      //   if(created){
      //     data.error = false;
      //   } else {
      //     data.error = true;
      //     data.serverMessage = 'Error, sentence not added';
      //   }
      //
      //   // send back the new sentence to the browser
      //   res.json(data)
      // }
    )
  },

};

module.exports = Sentences;
