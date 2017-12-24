const models = require("../models");
const selectKeywords = require('./modules/Keywords');

var Keywords = {

  // Obtenir la liste des keywords existants
  keywordGet : function(req, res, next){
    console.log(req);
    selectKeywords().then(results =>
      {
        console.log(results);
        res.json({'Keywords': results})
      }
    );
  },

  // Accepter les données du formulaire 'Ici keyword de mots';
  keywordPost : function(req, res, next){

    console.log('req.body: ', req.body);

    let dataToWrite = req.body;
    // let dataToWrite = {text:'test1',TagId:1};
    // let dataToWrite = {tags : [{text:'test1',TagId:1},{text:'toto1',TagId:1}]};

    // User.bulkCreate([
    //   { username: 'barfooz', isAdmin: true },
    //   { username: 'foo', isAdmin: true },
    //   { username: 'bar', isAdmin: false }
    // ])
    // .then(() => { // Notice: There are no arguments here
    //   return User.findAll();
    // })
    // .then(users => {
    //   console.log(users)
    // });


    // insert into
    models.Keyword.findOrCreate(
      {
        where: {
          text: dataToWrite.text,
          TagId: dataToWrite.TagId
        }
      }
    )
    .spread(
      (keywords, created) => {
        console.log('keywords: ', keywords.dataValues);
        console.log('created: ', created);
        let data = {keywords};
        // set the error key
        if(created){
          data.error = false;
        } else {
          data.error = true;
          data.serverMessage = 'Error, keywords not added - Already there or database error';
        }

        // send back the new keywords to the browser
        res.json(data)
      }
    )
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
