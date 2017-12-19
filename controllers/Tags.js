Tagconst models = require("../models");

var Tags = {

  // Obtenir la liste des tags existants
  TagGet : function(req, res, next){
    console.log('Loading Tags');
    let allTags = [];
    models.Tag.findAll({})
    // query ok
    .then(results => {
      // console.log(results);
      results.map((result, i) => {
        // allcategories.push(result.dataValues);
        allTags[i] = result.dataValues;
        // console.log('res', i, result.dataValues);
      });
      // console.log('tata', allcategories);
      res.json({'Tags': allTags});
    });
  },

  // Accepter les données du formulaire 'Ici tag de mots';
  TagPost : function(req, res, next){

    console.log('req.body: ', req.body);
    res.json(req.body)

    // // insert into
    // models.Tag.findOrCreate(
    //   {
    //     where: {
    //       text: req.body
    //     }
    //   }
    // )
    // .spread(
    //   (tags, created) => {
    //     console.log('tags: ', tags.dataValues);
    //     let data = {tags};
    //     // set the error key
    //     if(created){
    //       data.error = false;
    //     } else {
    //       data.error = true;
    //       data.serverMessage = 'Error, tags not added - Already there or database error';
    //     }
    //
    //     // send back the new tags to the browser
    //     res.json(data)
    //   }
    // )
  },
};

module.exports = Keywords;
