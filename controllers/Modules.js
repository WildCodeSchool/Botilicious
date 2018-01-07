const models = require('../models');
const getModules = require('./modules/Modules');
const getTags = require('./modules/Tags');

const Modules = {

  moduleGet(req, res) {
    console.log(req.body);
    console.log(req.query);
    Promise.all([getModules(), getTags()])
      .then((results) => {
        console.log('results: ', results);
        const modules = results[0];
        results[0].map((module, i) => {
          modules[i].api = JSON.parse(module.api);
          console.log('modules: ', modules);
        });
        const tags = results[1];
        res.render('module/module', { modules, tags });
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
    // console.log('JSON.parse(body): ', JSON.parse(req.body));
    const newModule = req.body;
    if (!newModule.name) {
      res.json({ servermessage: 'Error, name length is 0', error: true });
    } else {
      const where = newModule;
      where.api = JSON.stringify(newModule.api);
      console.log('where: ', where);

      // insert into
      models.Module.findOrCreate({
        where,
      })
        .spread((createdModule, created) => {
          console.log('module.dataValues: ', createdModule.dataValues);
          console.log('module: ', newModule);
          const data = { module: createdModule.dataValues };
          console.log('data: ', data);
          data.module.api = JSON.parse(createdModule.dataValues.api);
          console.log('data: ', data);
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
