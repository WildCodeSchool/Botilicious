const models = require('../models');
const getModules = require('./modules/Modules');

const Modules = {

  moduleGet(req, res) {
    console.log(req.body);
    console.log(req.query);
    getModules()
      .then((results) => {
        console.log(results);
        res.render('module/module', { modules: results });
      })
      .catch((error, data) => {
        console.log(error, data);
        res.render('module/module', { error });
      });
  },

  moduleListGet(req, res) {
    console.log(req.body);
    console.log(req.query);
    let attributes;
    if (req.query.TagId) {
      attributes = { TagId: req.query.TagId };
    }
    getModules(attributes)
      .then((results) => {
        res.json({ modules: results });
      })
      .catch((error, data) => {
        console.log(error, data);
        res.json({ servermessage: error });
      });
  },

  // Accepter les données du formulaire 'Nouveau Modules'
  modulePost(req, res) {
    console.log('body: ', req.body);

    if (!req.body.name) {
      res.json({ servermessage: 'Error, name length is 0', error: true });
    } else {
      const name = req.body.name;
      const description = req.body.description;
      const apiurl = req.body.apiurl;
      // insert into
      models.Module.findOrCreate({
        where: {
          name,
          description,
          apiurl,
        },
      })
        .spread((newModule, created) => {
          console.log('module.dataValues: ', newModule.dataValues);
          console.log('module: ', newModule);
          const data = { module: newModule.dataValues };
          // set the error key
          if (created) {
            data.error = false;
          } else {
            data.error = true;
            data.serverMessage = 'Error, module not added - Already there or database error';
          }

          // send back the new sentence to the browser
          res.json(data);
        });
    }
  },

  moduleDelete(req, res) {
    console.log(req.body);
    console.log(req.query);
    // delete
    models.Module.destroy({
      where: { id: req.body.id },
    })
      .then(res.status(200).json({ servermessage: 'delete ok' }));
  },

};

module.exports = Modules;
