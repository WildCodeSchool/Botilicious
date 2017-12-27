const models = require('../models');

const Modules = {

  // Accepter les données du formulaire 'Nouveau Modules' ===> router.post('/modules', addModules.modulesEnBdd);
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
};

module.exports = Modules;
