const models = require('../models');
const getModules = require('./modules/Modules');

const Modules = {

  moduleGet(req, res) {
    console.log(req.body);
    console.log(req.query);
    let attributes;
    if (req.query.TagId) {
      attributes = { TagId: req.query.TagId };
    }
    getModules(attributes)
      .then((results) => {
        res.json({ Modules: results });
      })
      .catch((error, data) => {
        console.log(error, data);
        res.json({ servermessage: error });
      });
  },

  // Accepter les données du formulaire 'Nouveau Modules'
  // ===> router.post('/modules', addModules.modulesEnBdd);
  modulePost(req, res) {
    const nom = req.body.name;
    const desc = req.body.description;
    const url = req.body.apiurl;

    models.module.create({
      name: nom,
      description: desc,
      apiurl: url,
    });
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
