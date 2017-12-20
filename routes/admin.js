const express = require('express');
const router = express.Router();


// permet de faire la liaison avec les controlleurs
const Chatbots = require('../controllers/Chatbots');
const Keywords = require('../controllers/Keywords');
const Modules = require('../controllers/Modules');
const Sentences = require('../controllers/Sentences');
const Users = require('../controllers/Users');
const Tags = require('../controllers/Tags');

/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles post-connexion */


/* GET Affichage de la page de configuration du chatbot */
router.get('/', Chatbots.index);

/* GET Affichage de la page de mise à jour de mise à jour des infos personnelles */
router.get('/update', Users.update);


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
router.get('/updateconfirmation', Users.updateconfirmation);


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


router.get('/chatbot', Chatbots.chatbotGet);
// Accepter les données du formulaire 'Nouveau Chatbot' ===> router.post('/configchat', chatbot.configchatEnBdd);
router.post('/chatbot', Chatbots.chatbotPost);


router.get('/message', Chatbots.messageGet);
router.post('/message', Chatbots.messagePost);

// Accepter les données du formulaire 'Nouveau Modules' ===> router.post('/modules', addModules.modulesEnBdd);
router.post('/module', Modules.modulePost);

router.get('/keyword', Keywords.keywordGet);
router.post('/keyword', Keywords.keywordPost);

router.get('/tag', Tags.tagGet);
router.post('/tag', Tags.tagPost);
router.delete('/tag', Tags.tagDelete);

// Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
router.post('/sentence', Sentences.sentencePost);
router.delete('/sentence', Sentences.sentenceDelete);

module.exports = router;
