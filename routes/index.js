const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');
const validator = require('validator');
const nodemailer = require("nodemailer");
const connection = mysql.createConnection(config);

connection.connect();


/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles pré-connexion */


/* GET Affichage de la page d'erreur 404 */
router.get('/erreur404', function (req, res, next) {
    res.render('error');
});


/* GET Affichage de la page d'inscription avec le formulaire */
router.get('/', function (req, res, next) {
    console.log('render index');
    res.render('index');
});


router.post('/', function (req, res, next) {
    let error=[];
    console.log(validator.isEmpty(req.body.prenom));
    if(validator.isEmpty(req.body.prenom) ){
        error[0] = "Veuillez renseigner votre prenom";
        console.log(error.length);
    }
    if(validator.isEmpty(req.body.nom) ){
        error[1] = "Veuillez renseigner votre nom";
        console.log(error.length);
    }
    if(validator.isEmpty(req.body.email) ){
        error[2] = "Veuillez renseigner votre identifiant";
        console.log(error.length);
    }
    if(validator.isEmpty(req.body.motdepasse) ){
        error[3] = "Veuillez renseigner votre mot de passe";
        console.log(error.length);
    }
    if(error.length>0){
            console.log(error);
            res.render('index', {error: error});
        }else{
            res.redirect('/confirminscription');
        }



});


router.get('/emailsending', function(req, res, next) {
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bad2f38eae6508",
      pass: "359d3004ac5407"
    }
  });
transport.sendMail({
      from: "Botilicious <Botilicious@wild.com>", // Expediteur
      to: "supermario@gmail.com", // Destinataires
      subject: "Cookies", // Sujet
      text: "Hello, to confirm your account on Botilicious, click on the following url :", // plaintext body
      html: "<b>Hello world ✔</b>" // html body
  }, (error, response) => {
if(error){
console.log(error);
      }else{
console.log("Message sent: " + response.message);
      }
  });
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
router.get('/connexion', function (req, res, next) {
    res.render('login');
});

router.get('/deconnexion', function (req, res, next) {
    res.render('deconnexion');
});


/* GET Affichage de la page de mise à jour pour le mot de passe oublié qui fonctionne */
router.get('/motdepasseoublie', function (req, res, next) {
    res.render('oubli');
});


/* POST Prise en compte du login */
router.post('/connexion', function (req, res, next) {
    console.log('login en cours');
    console.log(req.body);
    let login = req.body.email;
    let pass = req.body.motdepasse;
    console.log(login, pass);
    connection.query('SELECT * FROM users WHERE email = ? AND password = ? ;',[login, pass],function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        console.log('error login');
        res.redirect('/connexion');
      } else {
    req.session.connected = true;
    req.session.user = results[0].id;
    console.log(req.session);
    res.redirect('/main/');
      }
    });

});


/* Ajouter la route de confirmation de deconnexion, peut-être dans Main */


module.exports = router;
