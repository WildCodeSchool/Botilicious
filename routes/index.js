const express = require('express');
const router = express.Router();
const validator = require('validator');
const nodemailer = require("nodemailer");

var indexes = require('../controllers/Indexes'); // permet de faire la liaison avec le controlleur 'Indexes.js'

/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles pré-connexion */


/* GET Affichage de la page d'erreur 404 */
router.get('/erreur404', indexes.erreur404);


/* GET Affichage de la page d'inscription avec le formulaire */
router.get('/',  indexes.indexGet); 


router.post('/', indexes.indexPost);


/* Envoie d'un email sur MailTrap depuis la route suivante*/
router.get('/emailsending', indexes.emailsending); 


/* POST Prise en compte des informations d'inscription qui fonctionne avec la bdd yeah */
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


/* GET Affichage de la page de confirmation d'inscription */
router.get('/confirmationinscription', indexes.confirmationinscription);


/* GET Affichage de la page de login */
router.get('/connexion', indexes.connexionGet);


/* GET Affichage de la page de déconnexion */
router.get('/deconnexion', indexes.deconnexion);


/* GET Affichage de la page de mise à jour pour le mot de passe oublié */
router.get('/motdepasseoublie', indexes.motdepasseoublie);


/* POST Prise en compte du login */
router.post('/connexion', indexes.connexionPost);


/* Ajouter la route de confirmation de deconnexion, peut-être dans Main */


module.exports = router;
