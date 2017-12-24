const models = require("../models");
const selectTags = require('./modules/Tags');

var Tags = {

  // Obtenir la liste des tags existants
  tagGet : function(req, res, next){
    // console.log('Loading tags');
    console.log('req.query: ', req.query);
    let myquery;
    req.query.id ? myquery = req.query.id : myquery = '';
    selectTags(myquery).then(results => {
      console.log('mytags: ', results);
      res.json({'Tags': results})
  });
  },

  // Accepter les données du formulaire 'Ici tag de mots';
  tagPost : function(req, res, next){

    console.log('req.body: ', req.body);

    if (req.body.length == 0 ) {
      res.json({'error' : true});
    } else {
      // insert into
      models.Tag.findOrCreate(
        {
          where: {
            text: req.body.text,
          }
        }
      )
      .spread(
        (tags, created) => {
          // console.log('tags: ', tags.dataValues);
          let data = {tags};
          // set the error key
          if(created){
            data.error = false;
          } else {
            data.error = true;
            data.serverMessage = 'Error, tags not added - Already there or database error';
          }

          // send back the new tags to the browser
          res.json(data)
        }
      )
      // fin insert into
    }
    // res.end()
  },

  //keywordDelete
  tagDelete: function(req, res, next) {
    console.log(req.body);

    // insert into
    models.Tag.destroy(
      {
        where: {id: req.body.id}
      }
    )
    .then(
      res.status(200).send('delete ok')
    )
  },


};

module.exports = Tags;
