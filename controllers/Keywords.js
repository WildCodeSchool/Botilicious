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

  keywordPost : function(req, res, next){
    console.log(req.body);
    res.end();
  },

  // Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
  keywordPost : function(req, res, next){
    let texte = req.body.text;
    let genre = req.body.type;
    let url = req.body.apiurl;
    models.keyword.create(
      {
        text : texte,
        type : genre
      }
    );
  },
};

module.exports = Keywords;
