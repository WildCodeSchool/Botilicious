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


/* GET Affichage de la page de configuration du chatbot */
router.get('/', Chatbots.index);


/* GET Affichage de la page de mise à jour de mise à jour des infos personnelles */
router.get('/update', Users.update);


/* GET Affichage de la page de confirmation de mise à jour */
router.get('/updateconfirmation', Users.updateconfirmation);


// page de configuration du chatbot
router.get('/chatbotEdit', Chatbots.chatbotEditGet);

// obtenir la liste des chatbots pour un utilisateur donnné
router.get('/chatbot', Chatbots.chatbotGet);
// Accepter les données du formulaire 'Nouveau Chatbot'
router.post('/chatbot', Chatbots.chatbotPost);
router.delete('/chatbot', Chatbots.chatbotDelete);


router.get('/message', Chatbots.messageGet);
router.post('/message', Chatbots.messagePost);


router.get('/module', Modules.moduleGet);
// Accepter les données du formulaire 'Nouveau Modules'
router.post('/module', Modules.modulePost);
router.delete('/module', Modules.moduleDelete);


router.get('/keyword', Keywords.keywordGet);
router.post('/keyword', Keywords.keywordPost);
router.delete('/keyword', Keywords.keywordDelete);


router.get('/tag', Tags.tagGet);
router.post('/tag', Tags.tagPost);
router.delete('/tag', Tags.tagDelete);


// Accepter les données du formulaire 'Nouvelles phrases'
// ===> router.post('/pattern', patterns.pattern);
router.get('/sentence', Sentences.sentenceGet);
router.post('/sentence', Sentences.sentencePost);
router.delete('/sentence', Sentences.sentenceDelete);

module.exports = router;
