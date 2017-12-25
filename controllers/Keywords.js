const models = require("../models");
const selectKeywords = require('./modules/Keywords');
const bulkCreateOrUpdate = require('./modules/bulkCreateOrUpdate');

var Keywords = {

  // Obtenir la liste des keywords existants
  keywordGet : function(req, res, next){
    console.log(req.body);
    console.log(req.query);
    selectKeywords({TagId : req.query.TagId})
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

    // let dataToWrite = {tags:[{text:'test1', TagId:1}]};
    // let dataToWrite = {tags : [{text:'test1', TagId:1},{text:'toto1', TagId:1}]};
    let dataToWrite = req.body;
    console.log('dataToWrite.keywords: ', dataToWrite.keywords);

    // build an array of keywords to create or update
    let keywordsToFind = dataToWrite.keywords.map(keyword => keyword.text);
    console.log('keywordsToFind: ', keywordsToFind);


    // insert into - several NEW keywords in bulk

    // if (dataToWrite.keywords.length = 0) {
    //   return res.status(501).json({serverMessage: 'Erreur - Liste de keywords vide'});
    // }

    return Promise.all(bulkCreateOrUpdate(dataToWrite.keywords))
    // return Promise.all(bulkCreateOrUpdate([{text: 'baba', TagId: 2}, {text: 'toto1', TagId: 1}]))
    .then(results => {
      console.log('results: ', results);
      models.Keyword
      .findAll()
      .then(findResults => res.status(200).json({keywords : findResults}))
    })
    .catch(err => res.status(501).send(err));


    // insert into - one keyword only

    // models.Keyword.findOrCreate(
    //   {
    //     where: {
    //       text: dataToWrite.keywords[0].text,
    //       TagId: dataToWrite.keywords[0].TagId
    //     }
    //   })
    //   .spread(
    //     (keywords, created) => {
    //       console.log('keywords: ', keywords.dataValues);
    //       console.log('created: ', created);
    //       let data = {keywords};
    //       // set the error key
    //       if(created){
    //         data.error = false;
    //       } else {
    //         data.error = true;
    //         data.serverMessage = 'Error, keywords not added - Already there or database error';
    //       }
    //
    //       // send back the new keywords to the browser
    //       res.json(data)
    //     }
    //   )


    // insert into - several NEW keywords in bulk

    // models.Keyword.bulkCreate(dataToWrite.keywords)
    // .then(() => { // Notice: There are no arguments here
    //   return selectKeywords()
    // })
    // .then(keywords => {
    //   // console.log('keywords: ', keywords)
    //   res.json({'keywords': keywords});
    // });


    // How to use OR

    // {
    //   where: {
    //     authorId: {
    //       [Op.or]: [12, 13]
    //     }
    //   }
    // }

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
