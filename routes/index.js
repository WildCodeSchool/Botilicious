const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();

/* GET Affichage de la page d'inscription avec le formulaire */
router.get('/', function (req, res, next) {
    res.render('index');
});


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
router.get('/confirmationinscription', function (req, res, next) {
    res.render('confirminscription');
});


/* GET Affichage de la page de login */
outer.get('/connexion', function (req, res, next) {
    res.render('login');
});


/* Voir dans le fichier users.js les routes de connexion et de déconnexion */


/* GET Affichage de la page de mise à jour pour le mot de passe oublié qui fonctionne */
router.get('/motdepasseoublie', function (req, res, next) {
    res.render('oubli');
});


/* GET Affichage de la page de visualisation */
router.get('/botilicious', function (req, res, next) {
    res.render('botilicious');
});


/* GET Affichage de la page de mise à jour de mise à jour des infos personnelles */
router.get('/miseajour', function (req, res, next) {
    res.render('update');
});


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
router.get('/confirmationmaj', function (req, res, next) {
    res.render('confirmmaj');
});

/* GET Affichage de la page d'erreur 404 */
router.get('/erreur404', function (req, res, next) {
    res.render('error');
});


/* Ajouter la route de confirmation de deconnexion */






/* GET /admin/create
router.get('/create', function(req, res, next) {
	// Formulaire de création d'article
	res.render('admin-create');
}); */

module.exports = router;
