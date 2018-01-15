const models = require('../models');
const getSentences = require('./modules/Sentences');
const getKeywords = require('./modules/Keywords');
const autoAddKeywords = require('./modules/autoAddKeywords');
const getTags = require('./modules/Tags');
const getChatbots = require('./modules/Chatbots');
const apiCall = require('./modules/apiCall');
const detectKeywords = require('./modules/detectKeywords');
const autoTags = require('./modules/autotagSentence');
// const uuidv4 = require('uuid/v4');

const Chatbots = {

  // route GET '/admin' -- Affichage de la page de configuration du chatbot
  index(req, res) {
    res.redirect('/admin/chatbotEdit');
  },

  // route GET '/admin/configchat' -- Affichage de la page de configuration du chatbot
  chatbotEditGet(req, res) {
    // console.log(getSentences());
    Promise.all([getSentences(), getKeywords(), getTags()])
      .then((results) => {
        console.log('keywords found: ', results[1]);
        res.render('chatbot/chatbotEdit', { sentences: results[0], keywords: results[1], tags: results[2] });
      })
      .catch(error => console.log(error));

    // res.send('sentences ok');
    // res.end();
  },


  chatbotGet(req, res) {
    // console.log(req.body);
    // console.log(req.query);
    getChatbots()
      .then((results) => {
      // console.log(results);
        res.render('chatbot/chatbot', { chatbots: results });
      })
      .catch((error, data) => {
      // console.log(error, data);
        res.render('chatbot/chatbot', { servermessage: error });
      });
  },


  chatbotListGet(req, res) {
    // console.log(req.body);
    // console.log(req.query);
    let attributes;
    if (req.query.TagId) {
      attributes = { TagId: req.query.TagId };
    }
    getChatbots(attributes)
      .then((results) => {
        res.json({ Chatbots: results });
      })
      .catch((error, data) => {
        console.log(error, data);
        res.json({ servermessage: error });
      });
  },


  // Accepter les données du formulaire 'Nouveau Chatbot'
  chatbotPost(req, res) {
    // console.log('body: ', req.body);

    if (!req.body.name) {
      res.json({ servermessage: 'Error, name length is 0', error: true });
    } else {
      const name = req.body.name;
      // insert into
      models.Chatbot.findOrCreate({
        where: {
          name,
        },
      })
        .spread((chatbot, created) => {
        // console.log('chatbot.dataValues: ', chatbot.dataValues);
        // console.log('chatbot: ', chatbot);
          const data = { chatbot: chatbot.dataValues };
          // set the error key
          if (created) {
            data.error = false;
          } else {
            data.error = true;
            data.serverMessage = 'Error, chatbot not added - Already there or database error';
          }

          // send back the new sentence to the browser
          res.json(data);
        });
    }
  },

  // route GET '/admin/message' -- liste des messages d'une conversation
  messageGet(req, res) {
    // console.log('route messageGet');
    res.json([
      {
        id: 1,
        username: 'samsepi0l',
      },

      {
        id: 2,
        username: 'D0loresH4ze',
      },
    ]);
  },

  // route POST '/admin/message' -- soumission d'un message dans la boite de dialogue du chatbot
  messagePost(req, res) {
    req.session.currentMessageId += 1;
    req.session.history[req.session.currentMessageId] = { sentence: '', answer: '', module: '' };
    const splitMessage = req.body.message.split(' ');
    console.log('splitMessage: ', splitMessage);
    console.log('currentMessageId: ', req.session.currentMessageId);
    // écrire la phrase actuelle dans la session
    req.session.history[req.session.currentMessageId].sentence = req.body.message;
    console.log('************************ HISTORY ************************');
    console.log(req.session.history);
    models.Module.findOne({
      where: { name: splitMessage[0] },
    })

      .then((reponse) => {
        // on a trouvé un nom de module en premier mot
        if (reponse) {
          console.log('nom de module trouvé : ', splitMessage[0]);
          let errorMessage;
          let responseToBrowser;
          console.log('req.session: ', req.session);

          apiCall(splitMessage[0], splitMessage)
            .then((response) => {
              console.log('response: ', response);

              // écrire la réponse ou non réponse dans la session
              let foundAnswer = {};
              if (response) {
                foundAnswer = response;
              }
              req.session.history[req.session.currentMessageId].answer = foundAnswer.answer;

              responseToBrowser = {
                text: req.body.message,
                answer: response.answer,
                serverMessage: errorMessage,
              };
              res.json(responseToBrowser);
            })
            .catch({

            });

        // appel de l'API meteo en dur n'est pas possible, donc on analyse un peu mieux la phrase
        } else {
          /**
            * méthode sequelize pour trouver des données de la bdd et qui retourne un model
            * test si cest une question pour renvoyer une reponse
            */
          // const includes = { include: [models.Sentence_has_Module] };
          models.Sentence.findOne({
            where: { text: req.body.message },
            include: { model: models.Module },
          })
          /**
            * fonction qui permet de renvoyer une seule réponse
            * (dans le network de la console du navigateur)
            * lorsqu'une string de type question est écrite dans le chat.
            * Il faut utiliser un models.sentence.findOne({ })
            */
            .then((response) => {
              if (response) {
                console.log('response', response);
                console.log('req.session: ', req.session);

                // écrire le numéro actuel du module dans la session
                // let currentModule = 0;
                // console.log(response.dataValues.Modules);
                // if (response.dataValues.Modules[0]) {
                //   currentModule = response.dataValues.Modules[0];
                // }
                // req.session.history[req.session.currentMessageId].module = currentModule;

                // chercher la phrase suivante
                models.Sentence
                  .findOne({
                    where: { id: response.dataValues.next },
                    include: { model: models.Module },
                  })
                  .then((answer) => {
                    console.log('answer', answer);

                    // écrire la réponse ou non réponse dans la session
                    let foundAnswer = {};
                    if (answer.dataValues) {
                      foundAnswer = answer.dataValues;
                    }
                    req.session.history[req.session.currentMessageId].answer = foundAnswer.text;

                    console.log('session: ', req.session);

                    const jsontostring = {
                      answer: answer.dataValues.text,
                      text: req.body.message,
                    };
                    res.json(jsontostring);
                  });
                // si on ne trouve pas de phrase correspondant exactement, chercher un pattern
              } else {
                console.log('sentence not found, looking for a pattern...');
                // const pattern = detectKeywords(req.body.message)
                detectKeywords(req.body.message)
                  .then((results) => {
                    // console.log(req.session.history);
                    // console.log(results);
                    // écrire le numéro actuel du module dans la session
                    // let currentModule = 0;
                    // if (results !== []) {
                    //   currentModule = results[0].Modules[0];
                    // }
                    // req.session.history[req.session.currentMessageId].module = currentModule;
                    //
                    // console.log('session: ', req.session);

                    if (results.length > 0) {
                      console.log('results: ', results);
                      // chercher le next et essayer de tagger les mots
                      Promise.all([
                        models.Sentence.findOne({
                          where: { id: results[0].next },
                          include: { model: models.Module },
                        }),
                        autoAddKeywords(req.body.message, results[0].text),
                      ])
                        .then((answer) => {
                          console.log('answer: ', answer);
                          if (answer[0].dataValues) {
                            // écrire la réponse ou non réponse dans la session
                            let foundAnswer = {};
                            if (answer[0]) {
                              foundAnswer = answer[0].dataValues;
                            }
                            req.session.history[req.session.currentMessageId].answer = foundAnswer.text;

                            console.log('session: ', req.session);

                            const responseToBrowser = {
                              answer: answer[0].text,
                              text: req.body.message,
                              addedKeywords: answer[1],
                            };
                            res.json(responseToBrowser);
                          } else {
                            const reply = 'pattern trouvé, next pas trouvé';
                            req.session.history[req.session.currentMessageId].answer = reply;

                            console.log(reply);
                            const responseToBrowser = {
                              answer: reply,
                              text: req.body.message,
                            };
                            res.json(responseToBrowser);
                          }
                        });
                      // si on ne trouve pas de pattern, chercher seulement des keywords isolés
                    } else {
                      /**
                       * getKeywords retourne quels keywords sont présents dans la base de données
                       */
                      getKeywords()
                      /**
              * Si on a trouvé cette combinaison de mots clés
              */
                        .then((keywords) => {
                          if (keywords[0]) {
                            console.log('keywords :', keywords);
                            /**
                           * autoTags récupère la phrase du input, elle split la phrase suivant le 3ème paramètre (ici [' ']), et cherche les mots clés
                           * listés dans keywords
                           */
                            const resultat = autoTags(req.body.message, keywords, [' ']);
                            /**
                           * si on a trouvé un mot clé dans la phrase
                           */
                            if (resultat) {
                            /**
                             * Alors On cherche dans la table Sentence les mots clés trouvés. La fonction autoTag renvoie un tableau foundKeywords
                             * avec les mots clés trouvés
                             */
                              console.log(resultat.foundKeywords);
                              let foundKeywords = '';
                              for (let index = 0; index < resultat.foundKeywords.length; index++) {
                                foundKeywords += resultat.foundKeywords[index].tag;
                                console.log(resultat.foundKeywords[index].tag);
                              }
                              console.log(keywords);
                              // resultat.foundKeywords[0].tag + ' ' + resultat.foundKeywords[1].tag

                              models.Sentence.findAll({
                                where: { text: foundKeywords },
                                include: { model: models.Module },
                              })
                              /**
                             * Si on a trouvé cette combinaison de mots clés
                             */
                                .then((answer) => {
                                  console.log('answer :', answer);

                                  if (answer[0]) {
                                  /**
                                   * On cherche la phrase ciblée avec cette combinaison de mots clés grâce au next
                                   */
                                    models.Sentence.findOne({
                                      where: { id: answer[0].dataValues.next },
                                      include: { model: models.Module },
                                    })
                                    /**
                                   * Il faut alors retourner la phrase ciblée par cette combinaison de mots clés
                                   */
                                      .then((nextSentence) => {
                                      // écrire la réponse ou non réponse dans la session
                                        let foundAnswer = {};
                                        if (nextSentence[0]) {
                                          foundAnswer = nextSentence[0].dataValues;
                                        }
                                        req.session.history[req.session.currentMessageId].answer = foundAnswer.text;

                                        console.log('nextSentence: ', nextSentence);

                                        if (nextSentence.dataValues) {
                                          const jsontostring = {
                                            answer: nextSentence.dataValues.text,
                                            text: req.body.message,
                                          };
                                          res.json(jsontostring);
                                        } else {
                                          req.session.history.answers.unshift('keywords trouvé, next pas trouvé');

                                          console.log('nothing found');
                                          const responseToBrowser = {
                                            answer: 'keywords trouvé, next pas trouvé',
                                            text: req.body.message,
                                          };
                                          res.json(responseToBrowser);
                                        }
                                      });
                                  } else {
                                    const reply = 'rien trouvé';
                                    req.session.history[req.session.currentMessageId].answer = reply;

                                    console.log(reply);
                                    const responseToBrowser = {
                                      answer: reply,
                                      text: req.body.message,
                                    };
                                    res.json(responseToBrowser);
                                  }
                                });
                            // si on ne trouve pas de next, abandonner
                            } else {
                              req.session.history[req.session.currentMessageId].answer = 'keywords trouvé, template comme timeplace pas trouvé';

                              console.log('rien trouvé');
                              const responseToBrowser = {
                                answer: 'rien trouvé',
                                text: req.body.message,
                              };
                              res.json(responseToBrowser);
                            }
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  },

  chatbotDelete(req, res) {
    console.log(req.body);
    console.log(req.query);
    // delete
    models.Chatbot.destroy({
      where: { id: req.body.id },
    })
      .then(res.status(200).json({ servermessage: 'delete ok' }));
  },

};

module.exports = Chatbots;
