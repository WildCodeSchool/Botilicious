const express = require('express');

const router = express.Router();
// const models = require("../models");

/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles pré-connexion */

// permet de faire la liaison avec les controlleurs
const Indexes = require('../controllers/Indexes');
const Users = require('../controllers/Users');

// Permet de faire communiquer les serveurs react et express ensemble
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* GET Affichage de la page d'erreur 404 */
router.get('/error404', Indexes.error404);


router.get('/seeds', Indexes.seedPost);
router.get('/seed', Indexes.seedGet);


/* GET Affichage de la page d'inscription avec le formulaire */
router.get('/inscription', Indexes.indexGet);

/* POST Prise en compte des informations d'inscription qui fonctionne avec la bdd yeah */
router.post('/inscription', Indexes.indexPost);
/* A mettre à jour pour le projet Botilicious
router.post('/', function (req, res, next) {
connection.query('INSERT INTO wilders (prenom, nom, email, motdepasse, naissance, adresse, codepostal, ville) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.prenom, req.body.nom, req.body.email, req.body.motdepasse, req.body.naissance, req.body.adresse, req.body.codepostal, req.body.ville], function (error) {
if (error) {
console.log(error);
} else {
res.redirect('/confirmationinscription');
}
});
}); */


/* Envoie d'un email sur MailTrap depuis la route suivante */
router.post('/email', Indexes.emailPost);


/* GET Affichage de la page de confirmation d'inscription */
router.get('/registered', Users.registered);


/* GET Affichage de la page de login */
router.get('/', Users.loginGet);

/* POST Prise en compte du login */
router.post('/', Users.loginPost);


/* GET Affichage de la page de déconnexion */
router.get('/deconnection', Users.deconnection);


/* GET Affichage de la page de mise à jour pour le mot de passe oublié qui fonctionne */
router.get('/forgottenpw', Users.forgottenpw);
/* GET Affichage de la page de contact  */
router.get('/contact', Users.contactGet);

/* POST : envoies des données par l'utilisateur prises en compte */
router.post('/contact', Users.contactPost);

router.get('/testreact', (req, res) => res.render('test-react'));

module.exports = router;
