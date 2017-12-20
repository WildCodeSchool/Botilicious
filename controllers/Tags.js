const models = require("../models");
const selectTags = require('./modules/Tags');

var Tags = {

  // Obtenir la liste des tags existants
  tagGet : function(req, res, next){
    // console.log('Loading tags');
    selectTags().then(results => res.json({'Tags': results}));
  },

  // Accepter les données du formulaire 'Ici tag de mots';
  tagPost : function(req, res, next){

    console.log('req.body: ', req.body);

    // insert into
    models.Tag.findOrCreate(
      {
        where: {
          text: req.body.text
        }
      }
    )
    .spread(
      (tags, created) => {
        console.log('tags: ', tags.dataValues);
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
