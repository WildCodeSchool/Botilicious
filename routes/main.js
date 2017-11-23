const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
  console.log(req.body.message);
  let message = req.body.message.split(' ');
  let xmlhttp = new XMLHttpRequest();
  // console.log('bob');
  // console.log(xmlhttp);

  // at each new readystate
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
      let data = JSON.parse(xmlhttp.responseText);
      console.log(data);
      // console.log(data.list[0].weather[0].description);

      // the api call returns a weather forecast with 3 hours increments
      let time;
      if (message.length>1){
        time = 3*Math.round(message[1]/3);
      } else {
        time = 1;
      }
      if (time > 24) {
        time = 24;
      }

      // send back a weather forecast
      res.send("Weather " + time + " hour(s) from now in " + data.city.name + " (" + data.city.country + ") " + ": " + data.list[0].weather[0].description);
    }
    else if (xmlhttp.status == 400) {
      console.log("Error 400");
    }
    else {
      console.log("Statut de la réponse: %d (%s) state:", xmlhttp.status, xmlhttp.statusText, xmlhttp.readyState);
    }
    console.log(xmlhttp.status, xmlhttp.readyState);
  };
  xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q="+message[0]+"&APPID=7081077244653a5c7f8f9ab6496d6bd3", true);
  xmlhttp.send();
  // $(document).ready(function(){
  // $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Paris&APPID=7081077244653a5c7f8f9ab6496d6bd3",function(result){
  // // $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q="+req.body.message+"&mode=json&units=metric&cnt=10&APPID=7081077244653a5c7f8f9ab6496d6bd3",function(result){
  //   console.log(result);
  //   res.send("City: "+ result.city.name +" - Weather: "+ result.list[0].weather[0].description);
  // });
  // });


  //api meteo
  // $.ajax({
  //   url: "http://api.openweathermap.org/data/2.5/weather",
  //   jsonp: "callback",
  //   dataType: "jsonp",
  //   data: {
  //     // id: "2172797",
  //     APPID: "7081077244653a5c7f8f9ab6496d6bd3"
  //   },
  //   success: function(response) {
  //     console.log(response); // server response
  //     res.send(response.weather[0].main);
  //   }
  // });


  // res.send('bob');
  // res.sendStatus(200);
});

/* GET /admin/create
router.get('/create', function(req, res, next) {
// Formulaire de création d'article
res.render('admin-create');
}); */

module.exports = router;
