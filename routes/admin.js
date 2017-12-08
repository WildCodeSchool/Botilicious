const express = require('express');
const router = express.Router();


// permet de faire la liaison avec les controlleurs
var configchats = require('../controllers/Configchats');
var accounts = require('../controllers/Accounts');

/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles post-connexion */


/* GET Affichage de la page de configuration du chatbot */
router.get('/', configchats.index);

/* GET Affichage de la page de mise à jour de mise à jour des infos personnelles */
router.get('/miseajour', accounts.miseajour);


/* POST Prise en compte des informations de mise à jour
router.post('/miseajour/:idWilder(\\d+)', function(req, res, next){
connection.query('UPDATE wilders SET prenom = ?, nom = ?, email = ?, motdepasse = ?, naissance = ?, adresse = ?, codepostal = ?, ville = ?, WHERE id = ?', [req.body.prenom, req.body.nom, req.body.email, req.body.motdepasse, req.body.naissance, req.body.adresse, req.body.codepostal, req.body.ville], function (error) {
if (error) {
console.log(error);
} else {
res.redirect('/confirmationmaj');
}
})
}); */


/* GET Affichage de la page de confirmation de mise à jour */
router.get('/confirmationmaj', accounts.confirmationmaj);


/* GET Affichage de la page d'administration des données personnelles dans le formulaire de mise à jour
router.post('/miseajour/idWilder(\\d+)', function (req, res, next) {
connection.query('select * from wilders where id= ?', [req.params.idWilder], function (error) {
if (error) {
console.log(error);
} else {
res.render('update'), {
wilders = results[0]
}
});
});
}); */

router.get('/configchat', configchats.configchat);

router.post('/postamessage', configchats.postamessage);
router.post('/postasentence', configchats.postasentence);

// Accepter les données du formulaire 'Nouveau Chatbot' ===> router.post('/configchat', configchats.configchatEnBdd);
  router.post('/configchat', configchats.configchatEnBdd);

// Accepter les données du formulaire 'Nouveau Modules' ===> router.post('/modules', addModules.modulesEnBdd);
  router.post('/modules', configchats.modulesEnBdd);

// Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
  router.post('/pattern', configchats.pattern);
/* GET /admin/create
router.get('/create', function(req, res, next) {
// Formulaire de création d'article
res.render('admin-create');
}); */

module.exports = router;
