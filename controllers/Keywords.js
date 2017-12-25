const models = require("../models");
const selectKeywords = require('./modules/Keywords');

var Keywords = {

  // Obtenir la liste des keywords existants
  keywordGet : function(req, res, next){
    console.log(req.body);
    console.log(req.query);
    selectKeywords(req.query.TagId)
    .then(results =>
      {
        res.json({'Keywords': results})
      }
    )
    .catch((error, data) => {
      console.log(error, data);
      res.send(error);
    });
  },

  // Accepter les données du formulaire 'Ici keyword de mots';
  keywordPost : function(req, res, next){

    console.log('req.body: ', req.body);

    // let dataToWrite = {tags:[{text:'test1',TagId:1}]};
    // let dataToWrite = {tags : [{text:'test1',TagId:1},{text:'toto1',TagId:1}]};
    let dataToWrite = req.body;
    console.log('dataToWrite.keywords: ', dataToWrite.keywords);
    models.Keyword.bulkCreate(dataToWrite.keywords)
    .then(() => { // Notice: There are no arguments here
      return selectKeywords()
    })
    .then(keywords => {
      // console.log('keywords: ', keywords)
      res.json({'keywords': keywords});
    });

    // // insert into
    // models.Keyword.findOrCreate(
    //   {
    //     where: {
    //       text: dataToWrite.text,
    //       TagId: dataToWrite.TagId
    //     }
    //   }
    // )
    // .spread(
    //   (keywords, created) => {
    //     console.log('keywords: ', keywords.dataValues);
    //     console.log('created: ', created);
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
