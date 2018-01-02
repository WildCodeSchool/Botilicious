const models = require('../models');
const getSentences = require('./modules/Sentences');
const getKeywords = require('./modules/Keywords');
const getTags = require('./modules/Tags');
const getChatbots = require('./modules/Chatbots');
const apiCall = require('./modules/apiCall');


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
    console.log(req.body);
    console.log(req.query);
    getChatbots()
      .then((results) => {
        console.log(results);
        res.render('chatbot/chatbot', { chatbots: results });
      })
      .catch((error, data) => {
        console.log(error, data);
        res.render('chatbot/chatbot', { servermessage: error });
      });
  },


  chatbotListGet(req, res) {
    console.log(req.body);
    console.log(req.query);
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
    console.log('body: ', req.body);

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
          console.log('chatbot.dataValues: ', chatbot.dataValues);
          console.log('chatbot: ', chatbot);
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
    console.log('route messageGet');
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
    console.log(req.body.message);


    // /**
    // * méthode sequelize pour trouver des données de la bdd et qui retourne un model
    // * test si cest une question pour renvoyer une reponse
    // */
    //
    // models.Sentence.findOne({
    //   where: { text: req.body.message },
    // })
    //
    // /**
    // * fonction qui permet de renvoyer une seule réponse
    // * (dans le network de la console du navigateur)
    // * lorsqu'une string de type question est écrite dans le chat.
    // *
    // * Il faut utiliser un models.sentence.findOne({ })
    // */
    //   .then((response) => {
    //   // console.log('response',response);
    //     models.Sentence.findOne({
    //       where: { id: response.dataValues.next },
    //     })
    //       .then((answer) => {
    //         // console.log('answer',answer)
    //
    //         const jsontostring = {
    //           answer: answer.dataValues.text,
    //           text: req.body.message,
    //         };
    //         res.json(jsontostring);
    //       });
    //   });

    const message = req.body.message.split(' ');
    // const rand = [Math.floor(Math.random() * res.length)];
    let time;
    let errorMessage;
    if (message.length === 3 && typeof (parseInt(message[2], 10)) === 'number' && typeof (parseInt(message[1], 10)) === 'number') {
      time = (8 * message[1]) + Math.round(message[2] / 3);
    } else if (message.length === 2 && typeof (parseInt(message[1], 10)) === 'number') {
      time = 8 * message[1];
    } else {
      time = 0;
      errorMessage = 'Votre syntaxe est incorrecte';
    }
    if (time > 39) {
      time = 39;
    }
    console.log('time:', time);
    if (isNaN(time)) {
      errorMessage = 'Votre syntaxe est incorrecte';
      time = 0;
    }

    const tempArgs = {
      q: message[0],
      time,
      APPID: '096247cb370ee7b808f6578b219dec6c',
    };

    let responseToBrowser;
    apiCall('meteo', { params: tempArgs })
      .then((response) => {
        // console.log('response: ', response);
        const data = {
          Time: response.list[time].dt_txt,
          City: response.city.name,
          Country: response.city.country,
          Weather: response.list[time].weather[0].description,
          Temperature: Math.round(response.list[time].main.temp - 273.15),
        };
        responseToBrowser = {
          text: req.body.message,
          answer: `Weather (${data.Time} City: ${data.City} (${data.Country}) ): ${data.Weather} ${data.Temperature}°C`,
          serverMessage: errorMessage,
        };
        res.json(responseToBrowser);
      })
      .catch((error) => {
        console.log('API call Error: ', error.response.data.message);
        responseToBrowser = {
          text: req.body.message,
          answer: `Error api: ${error.response.data.message}`,
          error: error.response.data,
        };
        res.json(responseToBrowser);
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
