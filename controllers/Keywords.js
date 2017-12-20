const models = require("../models");

var Keywords = {

  // Obtenir la liste des tags existants
  keywordGet : function(req, res, next){
    console.log('Loading tags');
    let allcategories = [];
    models.Category.findAll({})
    // query ok
    .then(results => {
      // console.log(results);
      results.map((result, i) => {
        // allcategories.push(result.dataValues);
        allcategories[i] = result.dataValues;
        // console.log('res', i, result.dataValues);
      });
      // console.log('tata', allcategories);
      res.json({'tags':allcategories});
    });
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
};

module.exports = Keywords;
