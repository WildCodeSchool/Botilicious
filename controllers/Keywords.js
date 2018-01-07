const models = require('../models');
const getKeywords = require('./modules/Keywords');
const bulkCreateOrUpdate = require('./modules/bulkCreateOrUpdate');

const Keywords = {

  // Obtenir la liste des keywords existants
  keywordGet(req, res) {
    console.log(req.body);
    console.log(req.query);
    let attributes;
    if (req.query.TagId) {
      attributes = { TagId: req.query.TagId };
    }
    getKeywords(attributes)
      .then((results) => {
        res.json({ Keywords: results });
      })
      .catch((error, data) => {
        console.log(error, data);
        res.send(error);
      });
  },

  // Accepter les données du formulaire 'Ici keyword de mots';
  keywordPost(req, res) {
    console.log('req.body: ', req.body);

    // let dataToWrite = {keywords:[{text:'test1', TagId:1}]};
    // let dataToWrite = {keywords : [{text:'test1', TagId:1},{text:'toto1', TagId:1}]};
    const dataToWrite = req.body;
    console.log('dataToWrite.keywords: ', dataToWrite.keywords);

    // build an array of keywords to create or update
    const keywordsToFind = dataToWrite.keywords.map(keyword => keyword.text);
    console.log('keywordsToFind: ', keywordsToFind);


    // send an error if the keywords list is empty
    // if (dataToWrite.keywords.length = 0) {
    //   console.log('Erreur - Liste de keywords vide');
    //   return res.status(501).json({serverMessage: 'Erreur - Liste de keywords vide'});
    // }

    // insert into or update - several keywords in bulk
    // Parallel promises, an array as parameter

    if (!dataToWrite.keywords[0].text) {
      res.json({ serverMessageTag: 'Error, no keyword to add', error: true });
    } else {
    // return Promise.all(bulkCreateOrUpdate([{text: 'baba', TagId: 2}, {text: 'toto1', TagId: 1}]))
      Promise.all(bulkCreateOrUpdate(dataToWrite.keywords))
        .then((results) => {
          console.log('bulkCreateOrUpdate results: ', results);
          // a ameliorer plus tard
          // utiliser le retour de bulkCreateOrUpdate plutot que faire un findAll
          models.Keyword
            .findAll()
            .then(findResults => res.status(200).json({ keywords: findResults, message: 'Bien écrit' }));
        })
        .catch(error => res.status(501).json({ error }));
    }
  },

  // keywordDelete
  keywordDelete(req, res) {
    console.log(req.body);

    // delete
    models.Keyword.destroy({
      where: { id: req.body.id },
    })
      .then(res.status(200).json({ servermessage: 'delete ok' }));
  },

};

module.exports = Keywords;
