const models = require('../models');
const getSentences = require('./modules/Sentences');
const getKeywords = require('./modules/Keywords');
const getTags = require('./modules/Tags');
const getChatbots = require('./modules/Chatbots');


const Chatbots = {

  // route GET '/admin' -- Affichage de la page de configuration du chatbot
  index(req, res) {
    res.render('chatbot/chatbotEdit');
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
    const nom = req.body.name;

    models.chatbot.create({
      name: nom,
    });

    res.send('Nouveau bot ok');
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
    // let message = req.body.message.split(' ');

    /**
    * méthode sequelize pour trouver des données de la bdd et qui retourne un model
    * test si cest une question pour renvoyer une reponse
    */

    models.Sentence.findOne({
      where: { text: req.body.message },
    })

    /**
    * fonction qui permet de renvoyer une seule réponse
    * (dans le network de la console du navigateur)
    * lorsqu'une string de type question est écrite dans le chat.
    *
    * Il faut utiliser un models.sentence.findOne({ })
    */
      .then((response) => {
      // console.log('response',response);
        models.Sentence.findOne({
          where: { id: response.dataValues.next },
        })
          .then((answer) => {
            // console.log('answer',answer)

            const jsontostring = {
              answer: answer.dataValues.text,
              text: req.body.message,
            };
            res.json(jsontostring);
          });
      });
    // let rand = [Math.floor(Math.random()*res.length)];

    // let time;
    // let errorsyntaxe;
    // if (message.length == 3 && typeof(parseInt(message[2]))=== 'number' && typeof(parseInt(message[1]))=== 'number'){
    //   time = 8*message[1] + Math.round(message[2]/3);
    // } else if (message.length == 2 && typeof(parseInt(message[1]))=== 'number'){
    //   time = 8*message[1];
    // } else {
    //   time = 0;
    //   let errorsyntaxe='votre syntaxe est incorrecte';
    // }
    // if (time > 39) {
    //   time = 39;
    // }
    // console.log("time:", time);
    // if (isNaN(time)){
    //   errorsyntaxe='votre syntaxe est incorrecte';
    //   time=0;
    // }

    // request("http://api.openweathermap.org/data/2.5/forecast?q="+message[0]+"&APPID=7081077244653a5c7f8f9ab6496d6bd3", function(error, response, body){
    //   console.log(JSON.parse(response.body));

    //   let data = JSON.parse(response.body);

    //   let temp = Math.round(data.list[time].main.temp-273.15);

    //   console.log(temp);

    //   let responseapi = {Time: data.list[time].dt_txt+" ", City : data.city.name+" ", Country : data.city.country, Weather : data.list[time].weather[0].description+" ", Temperature : temp};
    //   console.log('reponse :',responseapi);
    //   // res.end();

    //   res.json(responseapi);
    // });
    //   }
    // )
    // .catch(function(err) {
    //   console.log('Fetch Error :-S', err);
    // });
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
