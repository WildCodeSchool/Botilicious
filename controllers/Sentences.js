var Sentences = {

  // Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
  sentencePost : function(req, res, next){
    let texte = req.body.text;
    let genre = req.body.type;
    let url = req.body.apiurl;
    models.sentence.create(
      {
        text : texte,
        type : genre
      }
    );
  },
};

module.exports = Sentences;
