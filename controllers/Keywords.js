const models = require("../models");
const selectKeywords = require('./modules/Keywords');

var Keywords = {

  // Obtenir la liste des keywords existants
  keywordGet : function(req, res, next){
    console.log('Loading keywords');
    selectKeywords().then(results => res.json({'Keywords': results}));
  },

  // Accepter les données du formulaire 'Ici tag de mots';
  keywordPost : function(req, res, next){

    console.log('req.body: ', req.body);
    res.json(req.body)

    // // insert into
    // models.Keyword.findOrCreate(
    //   {
    //     where: {
    //       text: req.body
    //     }
    //   }
    // )
    // .spread(
    //   (keywords, created) => {
    //     console.log('keywords: ', keywords.dataValues);
    //     let data = {keywords};
    //     // set the error key
    //     if(created){
    //       data.error = false;
    //     } else {
    //       data.error = true;
    //       data.serverMessage = 'Error, keywords not added - Already there or database error';
    //     }
    //
    //     // send back the new keywords to the browser
    //     res.json(data)
    //   }
    // )
  },

  //keywordDelete
  keywordDelete: function(req, res, next) {
    console.log(req.body);

    // insert into
    models.Keyword.destroy(
      {
        where: {id: req.body.id}
      }
    )
    .then(
      res.status(200).send('delete ok')
    )
  },


};

module.exports = Keywords;
