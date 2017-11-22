const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();

/* GET Affichage de la page d'inscription avec le formulaire */
router.get('/', function (req, res, next) {
    console.log('render index');
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


/* GET Affichage de la page de login */
router.get('/connexion', function (req, res, next) {
    res.render('login');
});

/* POST Prise en compte du login */
router.post('/connexion', function (req, res, next) {
    console.log(req.body);
    let name = req.body.identifiant;
    let pass = req.body.motdepasse;
    console.log(name, pass);
    // connection.query('SELECT * FROM users WHERE login = ? AND password = ? ;',[name, pass],function (error, results, fields) {
    //   if (error) throw error;
    //   if (results.length === 0) {
    //     res.redirect('/');
    //   } else {
    req.session.connected = true;
    req.session.cookie.maxAge = 3600000; // 1 heure
    req.session.user = results[0].id;
    console.log(req.session);
    res.redirect('/main');
    //   }
    // });

});

/* Voir dans le fichier users.js les routes de connexion et de déconnexion */


/* GET Affichage de la page de mise à jour pour le mot de passe oublié qui fonctionne */
router.get('/motdepasseoublie', function (req, res, next) {
    res.render('oubli');
});

/* GET Affichage de la page d'erreur 404 */
router.get('/erreur404', function (req, res, next) {
    res.render('error');
});


/* Ajouter la route de confirmation de deconnexion */


module.exports = router;
