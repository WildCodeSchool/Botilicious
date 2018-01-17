const express = require('express');

const router = express.Router();


// permet de faire la liaison avec les controlleurs
const Chatbots = require('../controllers/Chatbots');
const Keywords = require('../controllers/Keywords');
const Modules = require('../controllers/Modules');
const Sentences = require('../controllers/Sentences');
const Users = require('../controllers/Users');
const Tags = require('../controllers/Tags');

/* Projet IAforall - Botilicious Ce fichier regroupe les routes
des pages accessibles post-connexion */

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/* GET Affichage de la page de configuration du chatbot */
router.get('/', Chatbots.index);


/* GET Affichage de la page de mise à jour de mise à jour des infos personnelles */
router.get('/update', Users.update);


/* GET Affichage de la page de confirmation de mise à jour */
router.get('/updateconfirmation', Users.updateconfirmation);


// page de configuration du chatbot
router.get('/chatbotEdit', Chatbots.chatbotEditGet);

// obtenir la page qui présente la liste de chatbots
router.get('/chatbot', Chatbots.chatbotGet);
// obtenir la liste des chatbots pour un utilisateur donnné
router.get('/chatbotList', Chatbots.chatbotListGet);
// Accepter les données du formulaire 'Nouveau Chatbot'
router.post('/chatbot', Chatbots.chatbotPost);
router.delete('/chatbot', Chatbots.chatbotDelete);


router.get('/message', Chatbots.messageGet);
router.post('/message', Chatbots.messagePost);


// obtenir la page qui présente la liste de modules
router.get('/module', Modules.moduleGet);
// obtenir la liste des chatbots pour un chatbot donnné
router.get('/moduleList', Modules.moduleListGet);
// Accepter les données du formulaire 'Nouveau Modules'
router.post('/module', Modules.modulePost);
router.delete('/module', Modules.moduleDelete);


router.get('/keyword', Keywords.keywordGet);
router.post('/keyword', Keywords.keywordPost);
router.delete('/keyword', Keywords.keywordDelete);


router.get('/tag', Tags.tagGet);
router.post('/tag', Tags.tagPost);
router.delete('/tag', Tags.tagDelete);


router.get('/sentence', Sentences.sentenceGet);
// Accepter les données du formulaire 'Nouvelles phrases'
router.post('/sentence', Sentences.sentencePost);
router.delete('/sentence', Sentences.sentenceDelete);
// Tagger une phrase avec les keywords existants
router.post('/sentenceAutotag', Sentences.sentenceAutotagPost);

module.exports = router;
