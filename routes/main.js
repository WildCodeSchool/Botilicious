const express = require('express');
const router = express.Router();


var mains = require('../controllers/Mains'); // permet de faire la liaison avec le controlleur 'Mains.js'

/* Projet IAforall - Botilicious Ce fichier regroupe les routes des pages accessibles post-connexion */


/* GET Affichage de la page de visualisation */
router.get('/', mains.index);

/* GET Affichage de la page de mise à jour de mise à jour des infos personnelles */
router.get('/miseajour', mains.miseajour);


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
router.get('/confirmationmaj', mains.confirmationmaj);   


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

router.get('/configchat', mains.configchat);

router.post('/postamessage', mains.postamessage); 

/* GET /admin/create
router.get('/create', function(req, res, next) {
// Formulaire de création d'article
res.render('admin-create');
}); */

module.exports = router;
