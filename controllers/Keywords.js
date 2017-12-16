var Keywords = {

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
