const express = require('express');
const router = express.Router();
const request = require('request');

/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles post-connexion */


/* GET Affichage de la page de visualisation */
router.get('/', function (req, res, next) {
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

  let time;
  let errorsyntaxe;
  if (message.length == 3 && typeof(parseInt(message[2]))=== 'number' && typeof(parseInt(message[1]))=== 'number'){
    time = 8*message[1] + Math.round(message[2]/3);
  } else if (message.length == 2 && typeof(parseInt(message[1]))=== 'number'){
    time = 8*message[1];
  } else {
    time = 0;
    let errorsyntaxe='votre syntaxe est incorrecte';
  }
  if (time > 39) {
    time = 39;
  }
  console.log("time:", time);
  if (isNaN(time)){
    errorsyntaxe='votre syntaxe est incorrecte';
    time=0;
  }

  request("http://api.openweathermap.org/data/2.5/forecast?q="+message[0]+"&APPID=7081077244653a5c7f8f9ab6496d6bd3", function(error, response, body){
      console.log(JSON.parse(response.body));

      let data = JSON.parse(response.body);

      let temp = Math.round(data.list[time].main.temp-273.15);

      console.log(temp);

      let responseapi = {Time: data.list[time].dt_txt+" ", City : data.city.name+" ", Country : data.city.country, Weather : data.list[time].weather[0].description+" ", Temperature : temp};
      console.log('reponse :',responseapi);
      // res.end();

      res.json(responseapi);
      });
  //   }
  // )
  // .catch(function(err) {
  //   console.log('Fetch Error :-S', err);
  // });
});

/* GET /admin/create
router.get('/create', function(req, res, next) {
// Formulaire de création d'article
res.render('admin-create');
}); */

module.exports = router;
