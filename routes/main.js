const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const config = require('../config.js');
const connection = mysql.createConnection(config);
connection.connect();


/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles post-connexion */


/* GET Affichage de la page de visualisation */
router.get('/botilicious', function (req, res, next) {
    res.render('configchat');
});

/* GET Affichage de la page de mise à jour de mise à jour des infos personnelles */
router.get('/miseajour', function (req, res, next) {
    res.render('update');
});


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

router.get('/configchat', function (req, res, next) {
    res.render('configchat');
});

router.post('/postamessage', function(req, res, next) {
  console.log(req.body);
  res.send('bob');
  // res.sendStatus(200);
});

/* GET /admin/create
router.get('/create', function(req, res, next) {
	// Formulaire de création d'article
	res.render('admin-create');
}); */

module.exports = router;
