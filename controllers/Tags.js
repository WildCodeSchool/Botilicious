const models = require('../models');
const getTags = require('./modules/Tags');

const Tags = {

  // Obtenir la liste des tags existants
  tagGet(req, res) {
    // console.log('Loading tags');
    // console.log('req.query: ', req.query);
    let attributes;
    if (req.query.id) {
      attributes = { id: req.query.id };
    }
    getTags(attributes).then((results) => {
      // console.log('mytags: ', results);
      res.json({ Tags: results });
    });
  },

  // Accepter les données du formulaire 'Ici tag de mots';
  tagPost(req, res) {
    console.log('req.body: ', req.body);

    if (!req.body.text) {
      res.json({ serverMessageTag: 'Error, tags length is 0', error: true });
    } else {
      // {
      //   where: {
      //     authorId: {
      //       [Op.or]: [12, 13]
      //     }
      //   }
      // }

      // insert into
      models.Tag.findOrCreate({
        where: {
          text: req.body.text,
        },
      })
        .spread((tags, created) => {
          // console.log('tags: ', tags.dataValues);
          const data = { tags };
          // set the error key
          if (created) {
            data.error = false;
          } else {
            data.error = true;
            data.serverMessageTag = 'Error, tags not added - Already there or database error';
          }

          // send back the new tags to the browser
          res.json(data);
        });
      // fin insert into
    }
    // res.end()
  },

  // keywordDelete
  tagDelete(req, res) {
    console.log(req.body);

    // delete
    models.Tag.destroy({
      where: { id: req.body.id },
    })
      .then(res.status(200).json({ servermessage: 'delete ok' }));
  },


};

module.exports = Tags;
