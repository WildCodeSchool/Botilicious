var Modules = {

  // Accepter les données du formulaire 'Nouveau Modules' ===> router.post('/modules', addModules.modulesEnBdd);
  modulePost : function(req, res, next){
    let nom = req.body.name;
    let desc = req.body.description;
    let url = req.body.apiurl;

    models.module.create(
      {
        name : nom,
        description : desc,
        apiurl : url
      }
    );
  },
};

module.exports = Modules;
