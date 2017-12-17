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
      console.log('tata', allcategories);
      res.json({'tags':allcategories});
    });
  },

  // Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
  keywordPost : function(req, res, next){
    console.log(req.body);
    res.end();
  },
};

module.exports = Keywords;
